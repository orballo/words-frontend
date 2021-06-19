import React from "react";
import { connect, useConnect, css } from "frontity";
import InputText from "./input-text";
import MessageError from "./message-error";
import ButtonSubmit from "./button-submit";
import MessageMethod from "./message-method";
import Loading from "../loading";
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

  const loadingStyles = css`
    height: 44px;
    margin-top: 28px;

    & > div > div {
      background-color: ${state.theme.colors.bgOne};
    }
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
        disabled={signupForm.isSubmitting}
      />
      <InputText
        label="Enter your username"
        name="username"
        value={signupForm.username}
        onChange={handleChange}
        placeholder="Username"
        disabled={signupForm.isSubmitting}
      />
      {signupForm.isAwaitingCode && (
        <InputText
          label="Enter the verification code"
          name="code"
          value={signupForm.code}
          onChange={handleChange}
          placeholder="Verification code"
          disabled={signupForm.isSubmitting}
        />
      )}
      {signupForm.isError && <MessageError message={signupForm.errorMessage} />}
      {signupForm.isSubmitting ? (
        <Loading css={loadingStyles} />
      ) : (
        <ButtonSubmit
          label={
            signupForm.isAwaitingCode ? "Sign up" : "Get verification code"
          }
        />
      )}
      <MessageMethod />
    </form>
  );
};

export default connect(SignUp);
