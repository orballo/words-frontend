import React from "react";
import { connect, useConnect } from "frontity";
import Loading from "../loading";
import { Packages } from "../../../types";

const Dashboard: React.FC = () => {
  const { state, actions } = useConnect<Packages>();

  return !state.auth.isSynced ? (
    <Loading />
  ) : (
    <div>
      Dashboard<button onClick={() => actions.auth.signout()}>Logout</button>
    </div>
  );
};

export default connect(Dashboard);
