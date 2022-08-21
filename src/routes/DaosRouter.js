import { Route, Routes } from "react-router-dom";
import DaosIndex from "../pages/daos/DaosIndex";
import DreamerDAO from "../pages/daos/DreamerDAO";

const DaosRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DaosIndex />} />
      <Route path="/DreamerDAO/proposals" element={<DreamerDAO />} />
    </Routes>
  );
};

export default DaosRouter;
