import React, { Fragment } from "react";
import DAOCard from "../../components/DAOCard";

import { DAOS } from "../../data/DAOs";

const DaosIndex = () => {
  return (
    <Fragment>
      <h2>Find your DAO!</h2>
      <div
        className="uk-width-4-5 uk-child-width-1-4 uk-text-center uk-flex-wrap"
        uk-grid="true"
      >
        {DAOS.map((dao, index) => {
          return (
            <div key={index}>
              <DAOCard {...dao} />
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default DaosIndex;
