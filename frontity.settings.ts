import { Settings } from "frontity/types";

const settings: Settings = {
  name: "words-frontend",
  state: {
    frontity: {
      title: "Words by Orballo",
    },
  },
  packages: ["words-theme", "@orballo/very-tiny-router"],
};

export default settings;
