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
        isSubmiting: false,
        isAwaitingCode: false,
        isError: false,
        errorMessage: "",
      },
    },
    theme: {
      colors: {
        bgOne: "#36393B",
        bgTwo: "#FBFBFB",
        textOne: "#FFFFFF",
        textTwo: "#333333",
      },
    },
  },
  actions: {
    auth: {
      signin: async ({ state }) => {
        const { signinForm } = state.auth;

        signinForm.isSubmiting = true;

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
        } else if (result.status === 200 && !payload.code) {
          signinForm.isAwaitingCode = true;
          console.log("Verification code:", (await result.json()).code);
        } else {
          const body = await result.json();
          state.auth.user = body;
          console.log("User:", body);
        }

        signinForm.isSubmiting = false;
      },
      updateSigninField: ({ state }) => (name, value) => {
        state.auth.signinForm[name] = value;
      },
    },
  },
};

export default theme;
