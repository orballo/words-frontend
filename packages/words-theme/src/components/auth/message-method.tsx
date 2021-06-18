import React from "react";
import { connect, useConnect, css } from "frontity";
import Link from "@orballo/very-tiny-router/link";
import { Packages } from "../../../types";

const MessageMethod: React.FC = () => {
  const { state } = useConnect<Packages>();

  const paragraphStyles = css`
    margin-top: 40px;
    font-size: 14px;
    margin-bottom: 0;
    text-align: right;
  `;

  const linkStyles = css`
    color: ${state.theme.colors.textTwo};
  `;

  return state.router.isSignup ? (
    <p css={paragraphStyles}>
      Already registered?{" "}
      <Link css={linkStyles} link="/signin">
        Sign in
      </Link>
    </p>
  ) : (
    <p css={paragraphStyles}>
      Not yet registered?{" "}
      <Link css={linkStyles} link="/signup">
        Sign up
      </Link>
    </p>
  );
};

export default connect(MessageMethod);
