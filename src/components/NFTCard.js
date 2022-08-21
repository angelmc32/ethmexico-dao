import React from "react";
import styled from "styled-components";

const NFTCard = ({
  image = null,
  name = "Placeholder",
  description = "Placeholder",
}) => {
  return (
    <StyledCard className="uk-card uk-card-default">
      <div className="uk-card-media-top uk-flex uk-flex-center uk-margin">
        {image ? (
          <div className="uk-width-1-2 uk-margin-top">
            <img src={image} alt="" />{" "}
          </div>
        ) : (
          <p>No image</p>
        )}
      </div>
      <div className="uk-card-body">
        <h3 className="uk-card-title uk-text-center">{name}</h3>
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  border-radius: 10px;
`;

export default NFTCard;
