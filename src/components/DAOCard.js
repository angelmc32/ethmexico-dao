import React from "react";
import styled from "styled-components";

const DAOCard = ({ name, members, isMember }) => {
  return (
    <StyledCard className="uk-card uk-card-default uk-card-body">
      <h3 className="uk-card-title">{name}</h3>
      <div className="uk-card-body">
        <p className="uk-margin-remove">Members:</p>
        <h4 className="uk-margin">{members}</h4>
        {isMember ? (
          <button className="uk-button uk-button-muted uk-margin">Join</button>
        ) : (
          <button className="uk-button uk-button-primary uk-margin">
            Vote
          </button>
        )}
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  border-radius: 10px;
`;

export default DAOCard;
