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
      signinForm: {
        email: "",
        code: "",
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
      signin: async () => {
        const result = await fetch("http://localhost:4000/auth/signin", {
          method: "POST",
        });

        console.log("result:", result);
      },
    },
  },
};

export default theme;
