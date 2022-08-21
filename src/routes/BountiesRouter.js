import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import BountiesIndex from "../pages/bounties/BountiesIndex";
import BountyNew from "../pages/bounties/BountyNew";

const BountiesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<BountiesIndex />} />
      <Route path="/create" element={<BountyNew />} />
    </Routes>
  );
};

export default BountiesRouter;
