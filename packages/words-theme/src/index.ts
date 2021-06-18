import Root from "./components";
import { fetch } from "frontity";
import Theme from "../types";

const theme: Theme = {
  name: "words-theme",
  roots: {
    theme: Root,
  },
  state: {
    auth: {
      backend: "http://localhost:4000",
      signinForm: {
        email: "",
        code: "",
        isSubmitting: false,
        isAwaitingCode: false,
        isError: false,
        errorMessage: "",
      },
      signupForm: {
        email: "",
        username: "",
        code: "",
        isSubmitting: false,
        isAwaitingCode: false,
        isError: false,
        errorMessage: "",
      },
    },
    theme: {
      colors: {
        bgOne: "#293B5F",
        bgTwo: "#FBFBFB",
        bgThree: "#7587ac",
        textOne: "#FFFFFF",
        textTwo: "#333333",
        textError: "#CC0000",
      },
    },
  },
  actions: {
    auth: {
      signin: async ({ state }) => {
        const { signinForm } = state.auth;

        if (signinForm.isAwaitingCode && !signinForm.code) {
          signinForm.isError = true;
          signinForm.errorMessage =
            "Please enter the verification code sent to your email.";
          return;
        }

        signinForm.isSubmitting = true;

        const endpoint = new URL("/auth/signin", state.auth.backend);
        const payload = { email: signinForm.email, code: signinForm.code };
        const result = await fetch(endpoint.toString(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (result.status !== 200) {
          const body = await result.json();
          signinForm.isError = true;
          signinForm.errorMessage = body.error.message;
        } else if (result.status === 200 && !signinForm.code) {
          signinForm.isAwaitingCode = true;
          console.log("Verification code:", (await result.json()).code);
        } else {
          const body = await result.json();
          state.auth.user = body;
          console.log("User:", body);
        }

        signinForm.isSubmitting = false;
      },
      updateSigninField: ({ state }) => (name, value) => {
        const { signinForm } = state.auth;

        signinForm[name] = value;

        if (signinForm.isError) {
          signinForm.isError = false;
          signinForm.errorMessage = "";
        }
      },
      signup: async ({ state }) => {
        const { signupForm } = state.auth;

        if (signupForm.isAwaitingCode && !signupForm.code) {
          signupForm.isError = true;
          signupForm.errorMessage =
            "Please enter the verification code sent to your email.";
          return;
        }

        signupForm.isSubmitting = true;

        const endpoint = new URL("/auth/signup", state.auth.backend);
        const payload = {
          email: signupForm.email,
          username: signupForm.username,
          code: signupForm.code,
        };
        const result = await fetch(endpoint.toString(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (result.status !== 200) {
          const body = await result.json();
          signupForm.isError = true;
          signupForm.errorMessage = body.error.message;
        } else if (result.status === 200 && !signupForm.code) {
          signupForm.isAwaitingCode = true;
          console.log("Verification code:", (await result.json()).code);
        } else {
          const body = await result.json();
          state.auth.user = body;
          console.log("User:", body);
        }

        signupForm.isSubmitting = false;

        console.log("signup!");
      },
      updateSignupField: ({ state }) => (name, value) => {
        const { signupForm } = state.auth;

        signupForm[name] = value;

        if (signupForm.isError) {
          signupForm.isError = false;
          signupForm.errorMessage = "";
        }
      },
    },
  },
};

export default theme;
