import React from "react";
import { connect, useConnect, css } from "frontity";
import InputText from "./input-text";
import MessageError from "./message-error";
import ButtonSubmit from "./button-submit";
import MessageMethod from "./message-method";
import { Packages } from "../../../types";

const SignIn: React.FC = () => {
  const { state, actions } = useConnect<Packages>();
  const { signinForm } = state.auth;

  React.useEffect(() => {
    if (state.auth.user) actions.router.set("/dashboard");
  }, [state.auth.user]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    actions.auth.updateSigninField(event.target.name, event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    actions.auth.signin();
  };

  const formStyles = css`
    ${!state.router.isSignin && "display: none;"}

    @media (min-width: 1024px) {
      ${!state.router.isSignup && "display: initial;"}
    }
  `;

  const titleStyles = css`
    text-transform: uppercase;
    font-size: 24px;
    margin: 0;
    margin-bottom: 16px;
    height: 36px;
  `;

  return (
    <form css={formStyles} onSubmit={handleSubmit}>
      <h2 css={titleStyles}>Sign in</h2>
      <InputText
        label="Enter your email"
        name="email"
        value={signinForm.email}
        onChange={handleChange}
        placeholder="email@example.com"
        disabled={signinForm.isAwaitingCode}
      />
      {signinForm.isAwaitingCode && (
        <InputText
          label="Enter the verification code"
          name="code"
          value={signinForm.code}
          onChange={handleChange}
          placeholder="Verification code"
        />
      )}
      {signinForm.isError && <MessageError message={signinForm.errorMessage} />}
      <ButtonSubmit
        label={signinForm.isAwaitingCode ? "Sign in" : "Get verification code"}
      />
      <MessageMethod />
    </form>
  );
};

export default connect(SignIn);
