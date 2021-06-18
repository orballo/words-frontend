import React from "react";
import { connect, useConnect, css } from "frontity";
import SignIn from "./signin";
import SignUp from "./signup";
import { Packages } from "../../../types";

const Auth: React.FC = () => {
  const { state } = useConnect<Packages>();

  const container = css`
    margin: auto;
    color: ${state.theme.colors.textTwo};
    background-color: ${state.theme.colors.bgTwo};
    width: calc(100% - 32px);
    padding: 52px;
    padding-top: 40px;
    box-sizing: border-box;
    max-width: 375px;
    ${!state.router.isAuth && "display: none;"}
  `;

  return (
    <div css={container}>
      {state.router.isSignin && <SignIn />}
      {state.router.isSignup && <SignUp />}
    </div>
  );
};

export default connect(Auth);
