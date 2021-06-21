import React from "react";
import { connect, useConnect } from "frontity";
import Home from "./home";
import Dashboard from "./dashboard";
import AddWord from "./add-word";
import { Packages } from "../../types";

const Main: React.FC = () => {
  const { state, actions } = useConnect<Packages>();

  React.useEffect(() => {
    if (!state.auth.isSynced) return;

    if (!state.router.isHome && !state.router.isAuth && !state.auth.user) {
      actions.router.set("/");
    }

    if ((state.router.isHome || state.router.isAuth) && !!state.auth.user) {
      actions.router.set("/dashboard");
    }
  }, [state.auth.isSynced, state.auth.user]);

  return (
    <>
      {state.router.isHome && <Home />}
      {state.router.isDashboard && <Dashboard />}
      {state.router.isAddWord && <AddWord />}
    </>
  );
};

export default connect(Main);
