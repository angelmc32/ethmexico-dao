import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import useAppContext from "../../hooks/useAppContext";
import useForm from "../../hooks/useForm";
import bronze_merit from "../../assets/images/bronze_merit.png";
import silver_merit from "../../assets/images/silver_merit.png";
import gold_merit from "../../assets/images/gold_merit.png";

import { createBounty } from "../../services/nft-services";

const BountyNew = () => {
  const { address, wallet } = useAppContext();
  const [nftImageState, setNftImageState] = useState(null);
  const [showPreviewState, setShowPreviewState] = useState(null);
  const [meritPointsState, setMeritPointsState] = useState(null);
  const { handleInput, form, resetForm } = useForm();

  const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);

  const handleSubmit = (event) => {
    event.preventDefault();
    const signer = ethersProvider.getSigner();
    console.log(ethersProvider);

    let bountyNftFactoryAbi = [
      "function deposit(uint _amount, address token) public payable",
      "function withdraw(uint256 amount, address payable destAddr) public",
      "function transferERC20(IERC20 token, address to, uint256 amount, uint256 bountyId) public",
      "function createBounty(address _newBountyOwner, uint256 _newBountyId, string memory _title, uint256 _value, address _erc20tokenAddress, string memory _erc20tokenSymbol, string memory _imageURI) public",
    ];

    let bountyNft = new ethers.Contract(
      "0x6bee2523a2e054846c45c1ec7da1258dbf04e159",
      bountyNftFactoryAbi,
      signer
    );
    // const gasEstimate = bountyNft.estimateGas.deposit(
    //   10,
    //   "0xd33602ce228adbc90625e4fc8071aae0cad11fe9"
    // );

    bountyNft
      .deposit(10, "0xd33602ce228adbc90625e4fc8071aae0cad11fe9", {
        value: 0,
        gasLimit: 8000000,
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
    // createBounty(
    //   address,
    //   form,
    //   "0xd33602ce228adbc90625e4fc8071aae0cad11fe9",
    //   "USDC",
    //   wallet
    // )
    //   .then((res) => {
    //     console.log(res);
    //     if (!window.ethereum) return;
    //     window.ethereum.request({
    //       method: "eth_sendTransaction",
    //       params: [res],
    //     });
    //   })
    //   .catch((error) => console.log(error));
  };

  const togglePreview = () => {
    setShowPreviewState(true);
  };

  const selectBadge = (event) => {
    const { value } = event.target;
    switch (value) {
      case "bronze":
        setNftImageState(bronze_merit);
        setMeritPointsState(2);
        break;
      case "silver":
        setNftImageState(silver_merit);
        setMeritPointsState(5);
        break;
      case "gold":
        setNftImageState(gold_merit);
        setMeritPointsState(10);
        break;
      default:
        setNftImageState(bronze_merit);
        setMeritPointsState(2);
        break;
    }
    handleInput(event);
  };

  useEffect(() => {
    if (!window.ethereum) return;
  }, [form]);
  return (
    <Fragment>
      <h2>Create New Bounty</h2>
      <div className="uk-width-1-1 uk-flex uk-flex-around">
        <div className="uk-width-2-5 uk-flex uk-flex-column uk-flex-middle">
          <StyledForm className="uk-form" onSubmit={handleSubmit}>
            <div className="uk-form-controls">
              <label htmlFor="title">Title:</label>
              <input
                name="title"
                id="title"
                type="text"
                className="uk-input"
                onChange={handleInput}
              />
            </div>
            <div className="uk-form-controls">
              <label htmlFor="date">Date:</label>
              <input
                name="date"
                id="date"
                type="date"
                className="uk-input"
                onChange={handleInput}
              />
            </div>
            <div className="uk-form-controls">
              <label htmlFor="compensationUSD">Compensation:</label>
              <input
                name="compensationUSD"
                id="compensationUSD"
                type="number"
                className="uk-input"
                onChange={handleInput}
              />
            </div>
            <div className="uk-form-controls">
              <label htmlFor="badge">Badge:</label>
              <div className="uk-flex uk-flex-column">
                <label className="uk-margin-left uk-margin-small-top">
                  <input
                    name="badge"
                    value="bronze"
                    type="radio"
                    className="uk-radio uk-margin-right"
                    onChange={selectBadge}
                    required
                  />
                  Bronze
                </label>
                <label className="uk-margin-left uk-margin-small-top">
                  <input
                    name="badge"
                    value="silver"
                    type="radio"
                    className="uk-radio uk-margin-right"
                    onChange={selectBadge}
                    required
                  />
                  Silver
                </label>
                <label className="uk-margin-left uk-margin-small-top">
                  <input
                    name="badge"
                    value="gold"
                    type="radio"
                    className="uk-radio uk-margin-right"
                    onChange={selectBadge}
                    required
                  />
                  Gold
                </label>
              </div>
            </div>
            {showPreviewState && (
              <button className="uk-button uk-button-primary">
                Create Bounty
              </button>
            )}
          </StyledForm>
          {!showPreviewState && (
            <button
              className="uk-button uk-button-primary uk-margin"
              onClick={togglePreview}
            >
              Preview
            </button>
          )}
        </div>
        <div className="uk-width-2-5 uk-flex uk-flex-center uk-flex-middle">
          {showPreviewState ? (
            <StyledPreviewCard className="uk-card uk-card-defaul">
              <div className="uk-card-media-top uk-flex uk-flex-center">
                <div className="uk-width-2-5 uk-flex uk-flex-center">
                  <img src={nftImageState} alt="merit badge" />
                </div>
              </div>
              <div className="uk-card-body">
                <h3 className="uk-card-title uk-text-center">{form.title}</h3>
                <div className="uk-flex uk-flex-between">
                  <p className="uk-margin-remove">${form.compensationUSD}.00</p>
                  <p className="uk-margin-remove">+{meritPointsState}</p>
                </div>
              </div>
            </StyledPreviewCard>
          ) : (
            <p>Please fill out the bounty data to generate preview</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

const StyledForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .uk-form-controls {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const StyledPreviewCard = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
`;

export default BountyNew;
