pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MembershipNFT is ERC721URIStorage {
    // BASE variables
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256 public _price = 0.01 ether;
    uint256 public maxTokenIds = 10000;
    
    //CUSTOM variables
    uint256 public _meritPoints;

    constructor( string memory _name, string memory _symbol ) 
    ERC721(_name, _symbol) {}

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