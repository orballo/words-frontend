import React from "react";
import { connect, useConnect, css } from "frontity";
import InputText from "./input-text";
import MessageError from "./message-error";
import ButtonSubmit from "./button-submit";
import MessageMethod from "./message-method";
import { Packages } from "../../../types";

const SignUp: React.FC = () => {
  const { state, actions } = useConnect<Packages>();
  const { signupForm } = state.auth;

  React.useEffect(() => {
    if (state.auth.user) actions.router.set("/dashboard");
  }, [state.auth.user]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    actions.auth.updateSignupField(event.target.name, event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    actions.auth.signup();
  };

  const formStyles = css`
    ${!state.router.isSignup && "display: none;"}
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
      <h2 css={titleStyles}>Sign up</h2>
      <InputText
        label="Enter your email"
        name="email"
        value={signupForm.email}
        onChange={handleChange}
        placeholder="Email"
        disabled={signupForm.isAwaitingCode}
      />
      <InputText
        label="Enter your username"
        name="username"
        value={signupForm.username}
        onChange={handleChange}
        placeholder="Username"
        disabled={signupForm.isAwaitingCode}
      />
      {signupForm.isAwaitingCode && (
        <InputText
          label="Enter the verification code"
          name="code"
          value={signupForm.code}
          onChange={handleChange}
          placeholder="Verification code"
        />
      )}
      {signupForm.isError && <MessageError message={signupForm.errorMessage} />}
      <ButtonSubmit
        label={signupForm.isAwaitingCode ? "Sign in" : "Get verification code"}
      />
      <MessageMethod />
    </form>
  );
};

export default connect(SignUp);
