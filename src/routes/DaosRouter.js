import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import DaosIndex from "../pages/daos/DaosIndex";

const DaosRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DaosIndex />} />
    </Routes>
  );
};

export default DaosRouter;
