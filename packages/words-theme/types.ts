import { Package, MergePackages, AsyncAction, Frontity } from "@frontity/types";
import VeryTinyRouter from "@orballo/very-tiny-router/types";

export default interface Theme extends Package {
  name: "words-theme";
  state: {
    auth: {
      signinForm: {
        email: string;
        code: string;
        isError: boolean;
        errorMessage: string;
      };
    };
    theme: {
      colors: {
        bgOne: string;
        bgTwo: string;
        textOne: string;
        textTwo: string;
      };
    };
  };
  actions: {
    auth: {
      signin: AsyncAction<Packages>;
    };
  };
}

export type Packages = MergePackages<Frontity, Theme, VeryTinyRouter>;
