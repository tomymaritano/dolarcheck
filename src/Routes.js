import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IndicesDeInflacion from "../pages/IndicesDeInflacion";
import Tasas from "../pages/Tasas";
import Crypto from "../pages/Crypto";
import Home from "../pages/Home";

const Routes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route path="/indices-de-inflacion" component={IndicesDeInflacion} />
        <Route path="/tasas" component={Tasas} />
        <Route path="/crypto" component={Crypto} />
      </Routes>
    </Router>
  );
};

export default Routes;
