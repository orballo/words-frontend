import React from "react";
import { connect, useConnect } from "frontity";
import { Packages } from "../../../types";

const Dashboard: React.FC = () => {
  const { state, actions } = useConnect<Packages>();
  console.log("user:", state.auth.user);
  return state.auth.user ? (
    <div>
      Dashboard<button onClick={() => actions.auth.signout()}>Logout</button>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default connect(Dashboard);
