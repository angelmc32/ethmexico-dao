import React, { Fragment, useState } from "react";
import styled from "styled-components";

const PROPOSALS = [
  {
    user: "user1.eth",
    isActive: true,
    title:
      "What do you think of making DreamerDAO a web3 learning platform like web3 university?",
    votingOptions: [
      "Yes, more technical and theory courses",
      "No, practical knowledge is more important",
    ],
    votes: [57, 43],
  },
  {
    user: "dreaming.eth",
    isActive: true,
    title: "Should DreamerDAO release a token?",
    votingOptions: ["Yes, WAGMI LFG!", "No, not every project needs a token"],
    votes: [31, 69],
  },
];

const DreamerDAO = () => {
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [votesCasted, setVotesCasted] = useState([false, false]);
  const castVote = (index) => {
    index === 0 ? setIsLoading1(true) : setIsLoading2(true);
    setTimeout(() => {
      index === 0
        ? setVotesCasted([true, votesCasted[1]])
        : setVotesCasted([votesCasted[0], true]);

      index === 0 ? setIsLoading1(false) : setIsLoading2(false);
    }, 1500);
  };

  return (
    <Fragment>
      <h2>DreamerDAO</h2>
      {PROPOSALS.map((proposal, index) => (
        <StyledCard
          className="uk-card uk-card-default uk-card-body uk-width-1-1 uk-margin"
          key={index}
        >
          <h3>{proposal.title}</h3>
          <div className="uk-card-body uk-flex uk-flex-column uk-flex-middle">
            {!votesCasted[index] ? (
              <Fragment>
                <button
                  className="uk-button uk-button-primary uk-width-3-5 uk-margin"
                  onClick={(event) => castVote(0)}
                  disabled={index === 0 ? isLoading1 : isLoading2}
                >
                  {proposal.votingOptions[0]}
                  {index === 0 && isLoading1 ? <div uk-spinner="true" /> : null}
                </button>
                <button
                  className="uk-button uk-button-danger uk-width-3-5 uk-margin"
                  onClick={(event) => castVote(1)}
                  disabled={index === 0 ? isLoading1 : isLoading2}
                >
                  {proposal.votingOptions[1]}
                  {index === 1 && isLoading2 ? <div uk-spinner="true" /> : null}
                </button>
              </Fragment>
            ) : (
              <Fragment>
                <p>
                  Your vote:{" "}
                  {index === 0
                    ? proposal.votingOptions[0]
                    : proposal.votingOptions[1]}
                </p>
                <p>
                  {index === 0
                    ? "Your voting power: 78 Merit Points x 3 Soulbound NFTs = 234 votes"
                    : "Your voting power: 80 Merit Points x 3 Soulbound NFTs = 240 votes"}
                </p>
              </Fragment>
            )}
          </div>
          <div className="uk-card-footer uk-flex uk-flex-between uk-flex-middle">
            <p className="uk-margin-remove">Posted by: {proposal.user}</p>
            <span className="uk-badge">Active</span>
          </div>
        </StyledCard>
      ))}
    </Fragment>
  );
};

const StyledCard = styled.div`
  border-radius: 10px;
`;

export default DreamerDAO;
