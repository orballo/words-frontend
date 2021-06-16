import React from "react";
import { connect, useConnect, css } from "frontity";
import Logo from "./logo";
import SignIn from "./auth/signin";
import SignUp from "./auth/signup";
import { Packages } from "../../types";

const Main: React.FC = () => {
  const { state } = useConnect<Packages>();

  const logoStyles = css`
    width: 300px;
    display: block;
    margin: 60px auto;
  `;

  return (
    <>
      <Logo css={logoStyles} />
      {state.router.link === "/signin" && <SignIn />}
      {state.router.link === "/signup" && <SignUp />}
    </>
  );
};

export default connect(Main);
