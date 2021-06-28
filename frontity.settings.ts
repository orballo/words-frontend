import { Settings } from "frontity/types";

const PROD = process.env.NODE_ENV === "production";

console.log("PROD:", process.env.NODE_ENV);

const settings: Settings = {
  name: "words-frontend",
  state: {
    frontity: {
      title: "Words by Orballo",
    },
    auth: {
      backend: PROD
        ? "https://wordsbackend.orballo.dev"
        : "http://words.local:4000",
    },
  },
  packages: ["words-theme", "@orballo/very-tiny-router"],
};

export default settings;
