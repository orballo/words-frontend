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

export interface Level {
  name: number;
  color: string;
  interval: number;
}

export interface WordReviewing extends Word {
  isCorrect: boolean;
  isFailed: boolean;
  failedTimes: number;
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
      isEditTag: Derived<Packages, boolean>;
      isReview: Derived<Packages, boolean>;
      parsedTag: Derived<Packages, number | null>;
    };
    auth: {
      isSynced: boolean;
      backend?: string;
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
        baseWords: Derived<Packages, Word[]>;
        filteredWords: Derived<Packages, Word[]>;
      };
      editWordForm: {
        id?: number;
        spelling: string;
        meaning: string;
        tags: number[];
        isSubmitting: boolean;
      };
      editTagForm: {
        id?: number;
        name: string;
        isSubmitting: boolean;
      };
    };
    review: {
      status: "input" | "correct" | "failed";
      answer: string;
      time?: number;
      reviewing: WordReviewing[];
      current: Derived<Packages, WordReviewing | undefined>;
      remaining: Derived<Packages, number>;
      isFinish: Derived<Packages, boolean>;
      incorrect: Derived<Packages, number>;
      correct: Derived<Packages, number>;
      ready: Derived<Packages, Word[]>;
      readyTotal: Derived<Packages, number>;
      readyForTag: Derived<Packages, number, Word[]>;
      readyForTagTotal: Derived<Packages, number, number>;
      levels: Record<number, Level>;
    };
    settings: {
      reviewBundleSize: number;
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
      deleteTag: AsyncAction<Packages>;
      getAllWords: AsyncAction<Packages>;
      addWord: AsyncAction<Packages>;
      editWord: AsyncAction<Packages>;
      reviewWord: AsyncAction<Packages, number, number>;
      deleteWord: AsyncAction<Packages>;
    };
    theme: {
      initAddWordForm: Action<Packages, number>;
      updateAddWordField: Action<Packages, string, string | number[]>;
      resetAddWordForm: Action<Packages>;
      updateAddTagField: Action<Packages, string, string>;
      resetAddTagForm: Action<Packages>;
      updateSearchField: Action<Packages, string, string>;
      resetSearchForm: Action<Packages>;
      initEditWordForm: Action<Packages, number>;
      updateEditWordField: Action<Packages, string, string | number[]>;
      resetEditWordForm: Action<Packages>;
      initEditTagForm: Action<Packages, number>;
      updateEditTagField: Action<Packages, string, string>;
      resetEditTagForm: Action<Packages>;
    };
    review: {
      afterCSR: AsyncAction<Packages>;
      init: Action<Packages>;
      reset: Action<Packages>;
      shuffle: Action<Packages>;
      updateAnswer: Action<Packages, string>;
      checkAnswer: AsyncAction<Packages>;
      next: Action<Packages>;
      levelUp: AsyncAction<Packages>;
      levelDown: AsyncAction<Packages>;
    };
  };
}

export type Packages = MergePackages<Frontity, Theme, VeryTinyRouter>;
