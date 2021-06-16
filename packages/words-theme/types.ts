import {
  Package,
  MergePackages,
  Action,
  AsyncAction,
  Frontity,
} from "@frontity/types";
import VeryTinyRouter from "@orballo/very-tiny-router/types";

export default interface Theme extends Package {
  name: "words-theme";
  state: {
    auth: {
      backend: string;
      user?: Record<string, any>;
      signinForm: {
        email: string;
        code: string;
        isSubmiting: boolean;
        isAwaitingCode: boolean;
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
      updateSigninField: Action<Packages, string, string>;
    };
  };
}

export type Packages = MergePackages<Frontity, Theme, VeryTinyRouter>;
