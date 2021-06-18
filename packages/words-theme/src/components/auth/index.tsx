import React from "react";
import { connect, useConnect, css } from "frontity";
import Link from "@orballo/very-tiny-router/link";
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
    padding: 40px 52px;
    padding-bottom: 44px;
    box-sizing: border-box;
    max-width: 375px;
    ${!state.router.isAuth && "display: none;"}

    @media (min-width: 1024px) {
      display: block;
      margin: 0;
    }
  `;

  return (
    <div css={container}>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default connect(Auth);
