import { Settings } from "frontity/types";

const settings: Settings = {
  name: "words-frontend",
  state: {
    frontity: {
      url: "https://test.frontity.org",
      title: "Test Frontity Blog",
      description: "WordPress installation for Frontity development",
    },
  },
  packages: ["words-theme", "@orballo/very-tiny-router"],
};

export default settings;
