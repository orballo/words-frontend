import Root from "./components";
import { fetch } from "frontity";
import Theme from "../types";

const theme: Theme = {
  name: "words-theme",
  roots: {
    theme: Root,
  },
  state: {
    router: {
      isHome: ({ state }) => state.router.link === "/" || state.router.isAuth,
      isSignin: ({ state }) => state.router.link === "/signin",
      isSignup: ({ state }) => state.router.link === "/signup",
      isAuth: ({ state }) => state.router.isSignin || state.router.isSignup,
      isDashboard: ({ state }) => state.router.link === "/dashboard",
      isSearch: ({ state }) => state.router.link.startsWith("/search"),
      isAddWord: ({ state }) => state.router.link === "/add-word",
      isAddTag: ({ state }) => state.router.link === "/add-tag",
      isEditWord: ({ state }) => state.router.link === "/edit-word",
      isReview: false,
    },
    auth: {
      isSynced: false,
      backend: "http://words.local:4000",
      signinForm: {
        email: "",
        code: "",
        isSubmitting: false,
        isAwaitingCode: false,
        isError: false,
        errorMessage: "",
      },
      signupForm: {
        email: "",
        username: "",
        code: "",
        isSubmitting: false,
        isAwaitingCode: false,
        isError: false,
        errorMessage: "",
      },
    },
    source: {
      tags: [],
      words: [],
      isRequestingWords: true,
      isRequestingTags: true,
    },
    theme: {
      colors: {
        bgOne: "#293B5F",
        bgTwo: "#FBFBFB",
        bgThree: "#7587AC",
        textOne: "#FFFFFF",
        textTwo: "#333333",
        textError: "#CC0000",
      },
      addWordForm: {
        spelling: "",
        meaning: "",
        tags: [],
        isSubmitting: false,
      },
      addTagForm: {
        name: "",
        isSubmitting: false,
      },
      searchForm: {
        search: "",
        filteredWords: ({ state }) => {
          const regexp = new RegExp(state.theme.searchForm.search, "i");
          const words = state.source.words.filter(
            (word) => word.spelling.match(regexp) || word.meaning.match(regexp)
          );
          return words;
        },
      },
      editWordForm: {
        spelling: "",
        meaning: "",
        tags: [],
        isSubmitting: false,
      },
    },
  },
  actions: {
    auth: {
      afterCSR: async ({ state }) => {
        const endpoint = new URL("/auth/verify", state.auth.backend);
        const response = await fetch(endpoint.toString(), {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 200) {
          state.auth.user = await response.json();
        }

        state.auth.isSynced = true;
      },
      signin: async ({ state }) => {
        const { signinForm } = state.auth;

        if (signinForm.isAwaitingCode && !signinForm.code) {
          signinForm.isError = true;
          signinForm.errorMessage =
            "Please enter the verification code sent to your email.";
          return;
        }

        signinForm.isSubmitting = true;

        const endpoint = new URL("/auth/signin", state.auth.backend);
        const payload = {
          email: signinForm.email.trim(),
          code: signinForm.code.trim(),
        };
        const result = await fetch(endpoint.toString(), {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (result.status !== 200) {
          const body = await result.json();
          signinForm.isError = true;
          signinForm.errorMessage = body.error.message;
        } else if (result.status === 200 && !signinForm.code) {
          signinForm.isAwaitingCode = true;
          console.log("Verification code:", (await result.json()).code);
        } else {
          const body = await result.json();
          state.auth.user = body;
        }

        signinForm.isSubmitting = false;
      },
      updateSigninField: ({ state }) => (name, value) => {
        const { signinForm } = state.auth;

        signinForm[name] = value;

        if (signinForm.isError) {
          signinForm.isError = false;
          signinForm.errorMessage = "";
        }
      },
      signup: async ({ state }) => {
        const { signupForm } = state.auth;

        if (signupForm.isAwaitingCode && !signupForm.code) {
          signupForm.isError = true;
          signupForm.errorMessage =
            "Please enter the verification code sent to your email.";
          return;
        }

        signupForm.isSubmitting = true;

        const endpoint = new URL("/auth/signup", state.auth.backend);
        const payload = {
          email: signupForm.email.trim(),
          username: signupForm.username.trim(),
          code: signupForm.code.trim(),
        };
        const result = await fetch(endpoint.toString(), {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (result.status !== 200 && result.status !== 201) {
          const body = await result.json();
          signupForm.isError = true;
          signupForm.errorMessage = body.error.message;
        } else if (result.status === 200 && !signupForm.code) {
          signupForm.isAwaitingCode = true;
          console.log("Verification code:", (await result.json()).code);
        } else {
          const body = await result.json();
          state.auth.user = body;
        }

        signupForm.isSubmitting = false;
      },
      updateSignupField: ({ state }) => (name, value) => {
        const { signupForm } = state.auth;

        signupForm[name] = value;

        if (signupForm.isError) {
          signupForm.isError = false;
          signupForm.errorMessage = "";
        }
      },
      signout: async ({ state }) => {
        const endpoint = new URL("/auth/signout", state.auth.backend);
        await fetch(endpoint.toString(), {
          method: "GET",
          credentials: "include",
        });

        delete state.auth.user;
      },
    },
    source: {
      getAllTags: async ({ state }) => {
        state.source.isRequestingTags = true;

        const endpoint = new URL("/tags", state.auth.backend);
        const response = await fetch(endpoint.toString(), {
          method: "GET",
          credentials: "include",
        });
        const body = await response.json();

        state.source.tags = body;

        state.source.isRequestingTags = false;
      },
      addTag: async ({ state }) => {
        const { addTagForm } = state.theme;

        addTagForm.isSubmitting = true;

        const endpoint = new URL("/tags", state.auth.backend);
        const payload = { name: addTagForm.name.trim() };
        const response = await fetch(endpoint.toString(), {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        addTagForm.isSubmitting = false;
      },
      editTag: async ({ state }) => {},
      getAllWords: async ({ state }) => {
        state.source.isRequestingWords = true;

        const endpoint = new URL("/words", state.auth.backend);
        const response = await fetch(endpoint.toString(), {
          method: "GET",
          credentials: "include",
        });
        const body = await response.json();

        state.source.words = body;

        state.source.isRequestingWords = false;
      },
      addWord: async ({ state }) => {
        const { addWordForm } = state.theme;

        addWordForm.isSubmitting = true;

        const endpoint = new URL("/words", state.auth.backend);
        const payload = {
          spelling: addWordForm.spelling.trim(),
          meaning: addWordForm.meaning.trim(),
          tags: addWordForm.tags,
        };
        const response = await fetch(endpoint.toString(), {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        addWordForm.isSubmitting = false;
      },
      editWord: async ({ state }) => {
        const { editWordForm } = state.theme;

        editWordForm.isSubmitting = true;

        const endpoint = new URL("/words/edit", state.auth.backend);
        const payload = {
          id: editWordForm.id,
          spelling: editWordForm.spelling.trim(),
          meaning: editWordForm.meaning.trim(),
          tags: editWordForm.tags,
        };
        const response = await fetch(endpoint.toString(), {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        editWordForm.isSubmitting = false;
      },
      deleteWord: async ({ state }) => {
        const { editWordForm } = state.theme;

        editWordForm.isSubmitting = true;

        const endpoint = new URL("/words", state.auth.backend);
        const payload = {
          id: editWordForm.id,
        };
        const response = await fetch(endpoint.toString(), {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        editWordForm.isSubmitting = false;
      },
    },
    theme: {
      updateAddWordField: ({ state }) => (name, value) => {
        const { addWordForm } = state.theme;

        addWordForm[name] = value;
      },
      resetAddWordForm: ({ state }) => {
        const { addWordForm } = state.theme;

        addWordForm.spelling = "";
        addWordForm.meaning = "";
        addWordForm.tags = [];
      },
      updateAddTagField: ({ state }) => (name, value) => {
        const { addTagForm } = state.theme;

        addTagForm[name] = value;
      },
      resetAddTagForm: ({ state }) => {
        const { addTagForm } = state.theme;

        addTagForm.name = "";
      },
      updateSearchField: ({ state }) => (name, value) => {
        const { searchForm } = state.theme;

        searchForm[name] = value;
      },
      resetSearchForm: ({ state }) => {
        const { searchForm } = state.theme;

        searchForm.search = "";
      },
      initEditWordForm: ({ state }) => (id) => {
        const word = state.source.words.find((word) => word.id === id);

        if (!word) return;

        const { editWordForm } = state.theme;

        editWordForm.id = word.id;
        editWordForm.spelling = word.spelling;
        editWordForm.meaning = word.meaning;
        editWordForm.tags = word.tags || [];
      },
      updateEditWordField: ({ state }) => (name, value) => {
        const { editWordForm } = state.theme;

        editWordForm[name] = value;
      },
      resetEditWordForm: ({ state }) => {
        const { editWordForm } = state.theme;

        delete editWordForm.id;
        editWordForm.spelling = "";
        editWordForm.meaning = "";
        editWordForm.tags = [];
      },
    },
  },
};

export default theme;
