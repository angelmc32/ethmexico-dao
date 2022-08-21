import { Route, Routes } from "react-router-dom";
import BountiesIndex from "../pages/bounties/BountiesIndex";
import BountyNew from "../pages/bounties/BountyNew";
import BountiesSubmit from "../pages/bounties/BountiesSubmit";

const BountiesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<BountiesIndex />} />
      <Route path="/create" element={<BountyNew />} />
      <Route path="/submit/:bountyId" element={<BountiesSubmit />} />
    </Routes>
  );
};

export default BountiesRouter;
