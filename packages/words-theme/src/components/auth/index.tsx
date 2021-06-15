import React from "react";
import { connect, useConnect } from "frontity";

const Auth: React.FC = () => {
  const { actions } = useConnect();
  return <button onClick={() => actions.auth.signin()}>Signin</button>;
};

export default connect(Auth);
