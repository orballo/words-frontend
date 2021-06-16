import React from "react";
import { connect, useConnect, css } from "frontity";
import { Packages } from "../../../types";

const SignIn: React.FC = () => {
  const { state, actions } = useConnect<Packages>();
  const { signinForm } = state.auth;

  React.useEffect(() => {
    if (state.auth.user) actions.router.set("/");
  }, [state.auth.user]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    actions.auth.updateSigninField(event.target.name, event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    actions.auth.signin();
  };

  const container = css`
    margin: auto;
    color: ${state.theme.colors.textTwo};
    background-color: ${state.theme.colors.bgTwo};
    width: 100%;
    padding: 52px;
    padding-top: 40px;
    box-sizing: border-box;
    max-width: 375px;
  `;

  const titleStyles = css`
    text-transform: uppercase;
    font-size: 24px;
    margin: 0;
    margin-bottom: 12px;
  `;

  const labelStyles = css`
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
  `;

  const inputStyles = css`
    display: block;
    height: 44px;
    box-sizing: border-box;
    border: none;
    background-color: ${state.theme.colors.bgOne};
    color: ${state.theme.colors.textOne};
    width: 100%;
    outline: none;
    padding: 0 12px;
    font-size: 16px;
    margin-bottom: 20px;

    &::placeholder {
      color: #888888;
    }
  `;

  const submitStyles = css`
    margin-top: 24px;
    min-height: 44px;
    box-sizing: border-box;
    width: 100%;
    display: block;
    padding: 0 12px;
    font-size: 16px;
    border: 2px solid;
    color: ${state.theme.colors.textTwo};
    background-color: ${state.theme.colors.bgTwo};
  `;

  return (
    <div css={container}>
      <form onSubmit={handleSubmit}>
        <h2 css={titleStyles}>Sign in</h2>
        <label>
          <span css={labelStyles}>Enter your email</span>
          <input
            type="text"
            name="email"
            css={inputStyles}
            value={signinForm.email}
            onChange={handleChange}
            placeholder="email@example.com"
          />
        </label>
        {signinForm.isAwaitingCode && (
          <label>
            <span css={labelStyles}>Enter the verification code</span>
            <input
              type="text"
              name="code"
              css={inputStyles}
              value={signinForm.code}
              onChange={handleChange}
              placeholder="Verification code"
            />
          </label>
        )}
        <button type="submit" css={submitStyles}>
          {signinForm.isAwaitingCode ? "Sign in" : "Get verification code"}
        </button>
      </form>
    </div>
  );
};

export default connect(SignIn);
