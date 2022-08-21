import React, { Fragment } from "react";
import styled from "styled-components";
import DAOCard from "../../components/DAOCard";

import { DAOS } from "../../data/DAOs";

const DaosIndex = () => {
  return (
    <Fragment>
      <h2>Find your DAO!</h2>
      <div className="uk-width-1-1 uk-text-center uk-flex uk-flex-center uk-flex-wrap">
        {DAOS.map((dao, index) => {
          return (
            <StyledDiv key={index} className="uk-width-1-4">
              <DAOCard {...dao} />
            </StyledDiv>
          );
        })}
      </div>
    </Fragment>
  );
};

const StyledDiv = styled.div`
  margin: 10px !important;
`;

export default DaosIndex;
