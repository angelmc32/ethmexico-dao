import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import useAppContext from "../../hooks/useAppContext";
import NFTCard from "../../components/NFTCard";
import Confetti from "react-confetti";

import gold_badge from "../../assets/nft_metadata/gold_badge.json";
// const silver_badge_URI =
//   "https://ipfs.io/ipfs/QmasVyyargGfuLBcJNhpxtHuhjMNtYEZAFZCujxQiQxrrz";
// const bronze_badge_URI =
//   "https://ipfs.io/ipfs/QmUHbny2snjs7Gco6Hkwyu44Yzrf1ZMh6e4SQssZyq9FT8";

const BountiesSubmit = () => {
  const { bounties } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showNft, setShowNft] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const params = useParams();

  const requestedBounty = bounties.find(
    (bounty) => bounty.id === params.bountyId
  );

  const submitBountyResolution = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowNft(true);
      setShowConfetti(true);
    }, 5000);
    setTimeout(() => {
      setShowConfetti(false);
    }, 10000);
  };
  console.log(requestedBounty);
  return (
    <Fragment>
      <h2>Submit Bounty</h2>
      {showConfetti && <Confetti />}
      {!showNft ? (
        <div className="uk-card uk-card-default uk-card-body">
          <h3 className="uk-card-title uk-text-center">
            {requestedBounty.title}
          </h3>
          <div className="uk-card-body">
            <h4 className="uk-text-center">{requestedBounty.dao}</h4>
            <div className="uk-flex uk-flex-between uk-flex-middle">
              <p className="uk-margin-remove">
                ${requestedBounty.compensationUSD}.00
              </p>
              <p className="uk-margin-remove">
                {requestedBounty.compensationMeritPoints} Merit Points
              </p>
            </div>
          </div>
          <div className="uk-card-footer uk-flex uk-flex-center">
            <button
              className="uk-button uk-button-primary"
              onClick={submitBountyResolution}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
              {isLoading && <div uk-spinner="true" />}
            </button>
          </div>
        </div>
      ) : (
        <div className="uk-width-1-3">
          <NFTCard name={gold_badge.title} image={gold_badge.image} />
        </div>
      )}
    </Fragment>
  );
};

export default BountiesSubmit;
