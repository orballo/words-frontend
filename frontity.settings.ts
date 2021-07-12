import { Settings } from "frontity/types";

const PROD = process.env.NODE_ENV === "production";

const settings: Settings = {
  name: "words-frontend",
  state: {
    frontity: {
      title: "Words by Orballo",
      description: "Tool to learn vocabulary",
    },
    auth: {
      backend: PROD
        ? "https://wordsbackend.orballo.dev"
        : "https://words.local:4000",
    },
  },
  packages: ["words-theme", "@orballo/very-tiny-router"],
};

export default settings;
