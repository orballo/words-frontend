import {
  Package,
  MergePackages,
  Action,
  AsyncAction,
  Derived,
  Frontity,
} from "@frontity/types";
import VeryTinyRouter from "@orballo/very-tiny-router/types";

export interface Word {
  id: number;
  author: number;
  created_at: string;
  updated_at: string;
  spelling: string;
  meaning: string;
  tags: number[];
  level: number;
  reviewed_at: string;
}
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
      isSearch: Derived<Packages, boolean>;
      isAddWord: Derived<Packages, boolean>;
      isAddTag: Derived<Packages, boolean>;
      isEditWord: Derived<Packages, boolean>;
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
      isSynced: boolean;
      words?: Word[];
      tags?: Tag[];
      isRequestingWords: boolean;
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
        tags: number[];
        isSubmitting: boolean;
      };
      addTagForm: {
        name: string;
        isSubmitting: boolean;
      };
      searchForm: {
        search: string;
        filteredWords: Derived<Packages, Word[]>;
      };
      editWordForm: {
        id?: number;
        spelling: string;
        meaning: string;
        tags: number[];
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
      afterCSR: AsyncAction<Packages>;
      getAllTags: AsyncAction<Packages>;
      addTag: AsyncAction<Packages>;
      editTag: AsyncAction<Packages>;
      getAllWords: AsyncAction<Packages>;
      addWord: AsyncAction<Packages>;
      editWord: AsyncAction<Packages>;
      deleteWord: AsyncAction<Packages>;
    };
    theme: {
      updateAddWordField: Action<Packages, string, string | number[]>;
      resetAddWordForm: Action<Packages>;
      updateAddTagField: Action<Packages, string, string>;
      resetAddTagForm: Action<Packages>;
      updateSearchField: Action<Packages, string, string>;
      resetSearchForm: Action<Packages>;
      initEditWordForm: Action<Packages, number>;
      updateEditWordField: Action<Packages, string, string | number[]>;
      resetEditWordForm: Action<Packages>;
    };
  };
}

export type Packages = MergePackages<Frontity, Theme, VeryTinyRouter>;
