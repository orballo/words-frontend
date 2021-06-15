import React from "react";
import { connect, useConnect, css } from "frontity";
import { Packages } from "../../../types";

const SignIn: React.FC = () => {
  const { state, actions } = useConnect<Packages>();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    actions.auth.signin();
  };

  const container = css`
    margin: auto;
    color: ${state.theme.colors.textTwo};
    background-color: ${state.theme.colors.bgTwo};
    width: 100%;
    min-height: 460px;
  `;

  return (
    <div css={container}>
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <label>
          <span>Enter your email</span>
          <input type="text" />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default connect(SignIn);
