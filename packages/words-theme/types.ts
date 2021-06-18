import {
  Package,
  MergePackages,
  Action,
  AsyncAction,
  Derived,
  Frontity,
} from "@frontity/types";
import VeryTinyRouter from "@orballo/very-tiny-router/types";

export default interface Theme extends Package {
  name: "words-theme";
  state: {
    router: {
      isHome: Derived<Packages, boolean>;
      isSignin: Derived<Packages, boolean>;
      isSignup: Derived<Packages, boolean>;
      isAuth: Derived<Packages, boolean>;
      isDashboard: Derived<Packages, boolean>;
    };
    auth: {
      backend: string;
      user?: Record<string, any>;
      signinForm: {
        email: string;
        code: string;
        isSubmitting: boolean;
        isAwaitingCode: boolean;
        isError: boolean;
        errorMessage: string;
      };
      signupForm: {
        email: string;
        username: string;
        code: string;
        isSubmitting: boolean;
        isAwaitingCode: boolean;
        isError: boolean;
        errorMessage: string;
      };
    };
    theme: {
      colors: {
        bgOne: string;
        bgTwo: string;
        bgThree: string;
        textOne: string;
        textTwo: string;
        textError: string;
      };
    };
  };
  actions: {
    auth: {
      afterCSR: AsyncAction<Packages>;
      signin: AsyncAction<Packages>;
      updateSigninField: Action<Packages, string, string>;
      signup: AsyncAction<Packages>;
      updateSignupField: Action<Packages, string, string>;
      signout: AsyncAction<Packages>;
    };
  };
}

export type Packages = MergePackages<Frontity, Theme, VeryTinyRouter>;
