import {
  Package,
  MergePackages,
  Action,
  AsyncAction,
  Derived,
  Frontity,
} from "@frontity/types";
import VeryTinyRouter from "@orballo/very-tiny-router/types";

export interface Word {}
export interface Tag {
  id: number;
  name: string;
  author: number;
  created_at: string;
  updated_at: string;
}

export default interface Theme extends Package {
  name: "words-theme";
  state: {
    router: {
      isHome: Derived<Packages, boolean>;
      isSignin: Derived<Packages, boolean>;
      isSignup: Derived<Packages, boolean>;
      isAuth: Derived<Packages, boolean>;
      isDashboard: Derived<Packages, boolean>;
      isAddWord: Derived<Packages, boolean>;
      isAddTag: Derived<Packages, boolean>;
      isReview: boolean;
    };
    auth: {
      isSynced: boolean;
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
    source: {
      tags?: Tag[];
      words?: Word[];
      isRequestingTags: boolean;
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
      addWordForm: {
        spelling: string;
        meaning: string;
        tags: string[];
        isSubmitting: boolean;
      };
      addTagForm: {
        name: string;
        isSubmitting: boolean;
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
    source: {
      getAllTags: AsyncAction<Packages>;
      addTag: AsyncAction<Packages>;
    };
    theme: {
      updateAddWordField: Action<Packages, string, string>;
      resetAddWordForm: Action<Packages>;
      updateAddTagField: Action<Packages, string, string>;
      resetAddTagForm: Action<Packages>;
    };
  };
}

export type Packages = MergePackages<Frontity, Theme, VeryTinyRouter>;
