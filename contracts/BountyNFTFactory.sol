pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract BountyNFTFactory is ERC721URIStorage {
    address public owner;
    uint256 public balance;
    mapping(bytes32 => address) public bountyIdToSmartContractAddress;
    mapping(bytes32 => address) public bountyIdToBountyOwner;
    
    event MintNewBounty(address indexed _createdBy, uint256 indexed _id, uint _value);
    event TransferReceived(address _from, uint _amount);
    event TransferSent(address _from, address _destAddr, uint _amount);

    // BASE variables
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 public _price = 0.0001 ether;
    uint256 public maxTokenIds = 10000;

    struct Bounty {
        address bountyOwner;
        uint256 NFT_ID;
        string title;
        uint256 value;
        address erc20tokenAddress;
        string erc20tokenSymbol;
        string imageURI;
    }

    mapping(uint256 => Bounty) public bounties;
    Bounty[] public allMintedBounties;

    constructor( string memory _name, string memory _symbol ) 
    ERC721(_name, _symbol) {
      owner = msg.sender;
    }

    // withdraw
    // completeBounty
    // createBounty
    // readBounty
    // 

    function deposit(uint _amount, IERC20 token) public payable {
        // Set the minimum amount to 1 token (in this case I'm using LINK token)
        uint _minAmount = 1*(10**18);
        // Here we validate if sended USDT for example is higher than 50, and if so we increment the counter
        require(_amount >= _minAmount, "Amount less than minimum amount");
        // I call the function of IERC20 contract to transfer the token from the user (that he's interacting with the contract) to
        // the smart contract  
        IERC20(token).transferFrom(msg.sender, address(this), _amount);
    }
    
    function withdraw(uint256 amount, address payable destAddr) public {
        require(msg.sender == owner, "Only owner can withdraw funds"); 
        require(amount <= balance, "Insufficient funds");
        
        destAddr.transfer(amount);
        balance -= amount;
        emit TransferSent(msg.sender, destAddr, amount);
    }
    
    function transferERC20(IERC20 token, address to, uint256 amount, uint256 bountyId) public {
        Bounty memory requestedBounty = bounties[bountyId];
        require(requestedBounty.value == amount, "Requested amount not the same as bounty value"); 
        uint256 erc20balance = token.balanceOf(address(this));
        require(amount <= erc20balance, "balance is low");
        token.transfer(to, amount);
        emit TransferSent(msg.sender, to, amount);
    }  

// delete _newBountyId from params, since we're using newItemId to generate tokenId
// include date field for bounty struct
    function createBounty(address _newBountyOwner, uint256 _newBountyId, string memory _title, uint256 _value, address _erc20tokenAddress, string memory _erc20tokenSymbol, string memory _imageURI) public {
        uint256 newItemId = _tokenIds.current();
        Bounty memory newBounty = Bounty(msg.sender, newItemId, _title, _value, _erc20tokenAddress, _erc20tokenSymbol, _imageURI);
        _safeMint(_newBountyOwner, _newBountyId);
        allMintedBounties.push(newBounty);
        emit MintNewBounty(msg.sender, newItemId, _value);
        _tokenIds.increment();
    }

    function mint(string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }

    
}