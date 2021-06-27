import React from "react";
import { connect, useConnect, css } from "frontity";
import Loading from "./loading";
import Home from "./home";
import Dashboard from "./dashboard";
import Search from "./search";
import AddWord from "./add-word";
import AddTag from "./add-tag";
import EditWord from "./edit-word";
import EditTag from "./edit-tag";
import Review from "./review";
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

  const mainStyles = css`
    max-width: 768px;
    min-height: 100%;
    margin: auto;
  `;

  return !state.router.isHome && !state.source.isSynced ? (
    <Loading />
  ) : (
    <main css={mainStyles}>
      {state.router.isHome && <Home />}
      {state.router.isDashboard && <Dashboard />}
      {state.router.isSearch && <Search />}
      {state.router.isAddWord && <AddWord />}
      {state.router.isAddTag && <AddTag />}
      {state.router.isEditWord && <EditWord />}
      {state.router.isEditTag && <EditTag />}
      {state.router.isReview && <Review />}
    </main>
  );
};

export default connect(Main);
