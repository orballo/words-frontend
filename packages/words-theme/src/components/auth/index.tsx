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
    padding: 52px;
    padding-top: 40px;
    box-sizing: border-box;
    max-width: 375px;
    ${!state.router.isAuth && "display: none;"}
  `;

  const paragraphStyles = css`
    margin-top: 40px;
    font-size: 14px;
    margin-bottom: 0;
    text-align: right;
  `;

  const linkStyles = css`
    color: ${state.theme.colors.textTwo};
  `;

  return (
    <div css={container}>
      {state.router.isSignin && <SignIn />}
      {state.router.isSignup && <SignUp />}
      {state.router.isSignin && (
        <p css={paragraphStyles}>
          Not yet registered?{" "}
          <Link css={linkStyles} link="/signup">
            Sign up
          </Link>
          .
        </p>
      )}
      {state.router.isSignup && (
        <p css={paragraphStyles}>
          Already registered?{" "}
          <Link css={linkStyles} link="/signin">
            Sign in
          </Link>
          .
        </p>
      )}
    </div>
  );
};

export default connect(Auth);
