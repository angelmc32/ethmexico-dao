import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BOUNTIES } from "../../data/Bounties";

const BountiesIndex = () => {
  return (
    <Fragment>
      <h2>Bounties</h2>
      <NavLink to="/bounties/create">
        <button className="uk-button uk-button-primary">+ Create</button>
      </NavLink>
      <StyledTable className="uk-table uk-table-middle">
        <thead>
          <tr>
            <td className="uk-text-center uk-text-bold">Title</td>
            <td className="uk-text-center uk-text-bold">DAO</td>
            <td className="uk-text-center uk-text-bold">Due Date</td>
            <td className="uk-text-center uk-text-bold">Compensation</td>
            <td className="uk-text-center uk-text-bold">Merit Points</td>
            <td className="uk-text-center uk-text-bold">Submit</td>
          </tr>
        </thead>
        <tbody>
          {BOUNTIES.map((bounty) => {
            return (
              <tr className="mc-row-card" key={bounty.id}>
                <td className="uk-text-center">{bounty.title}</td>
                <td className="uk-text-center">{bounty.dao}</td>
                <td className="uk-text-center">{bounty.dueDate}</td>
                <td className="uk-text-center">{bounty.compensationUSD}</td>
                <td className="uk-text-center">
                  {bounty.compensationMeritPoints}
                </td>
                <td className="uk-text-center">
                  <NavLink to="/bounties/submit">
                    <button className="uk-button uk-button-primary uk-button-small">
                      Submit
                    </button>
                  </NavLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </Fragment>
  );
};

const StyledTable = styled.table`
  tr.mc-row-card {
    margin: 10px 0px;
    border: 1px solid #f8f8f8;
    border-radius: 10px;
    background-color: #f8f8f8;
  }
`;

export default BountiesIndex;
