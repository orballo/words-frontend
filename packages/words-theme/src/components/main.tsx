import React from "react";
import { connect, useConnect } from "frontity";
import Home from "./home";
import Dashboard from "./dashboard";
import { Packages } from "../../types";

const Main: React.FC = () => {
  const { state } = useConnect<Packages>();

  return (
    <>
      {state.router.isHome && <Home />}
      {state.router.isDashboard && <Dashboard />}
    </>
  );
};

export default connect(Main);
