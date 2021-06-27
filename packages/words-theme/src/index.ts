import Root from "./components";
import { fetch, observe } from "frontity";
import { match } from "path-to-regexp";
import { shuffle } from "./utils";
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
      isEditTag: ({ state }) => state.router.link === "/edit-tag",
      isReview: ({ state }) => state.router.link.startsWith("/review"),
      parsedTag: ({ state }) => {
        const parse = match("/(search|review)/:tag");
        const result = parse(state.router.link) as any;
        if (!result?.params?.tag) return null;
        return parseInt(result.params.tag);
      },
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
      isSynced: false,
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
        baseWords: ({ state }) => {
          if (!state.router.parsedTag) return state.source.words;

          const words = state.source.words.filter((word) =>
            word.tags.includes(state.router.parsedTag)
          );

          return words;
        },
        filteredWords: ({ state }) => {
          const { searchForm } = state.theme;

          const regexp = new RegExp(state.theme.searchForm.search, "i");
          const words = searchForm.baseWords.filter(
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
      editTagForm: {
        name: "",
        isSubmitting: false,
      },
    },
    review: {
      status: "input",
      answer: "",
      reviewing: [],
      current: ({ state }) => {
        return state.review.reviewing.find((word) => !word.isCorrect);
      },
      remaining: ({ state }) => {
        return state.review.reviewing.filter((word) => !word.isCorrect).length;
      },
      isFinish: ({ state }) => {
        return !state.review.remaining;
      },
      incorrect: ({ state }) => {
        const total = state.review.reviewing.length;
        const failed = state.review.reviewing.filter((word) => word.isFailed)
          .length;

        return Math.round((100 * failed) / total);
      },
      correct: ({ state }) => {
        return 100 - state.review.incorrect;
      },
      ready: ({ state }) => {
        return state.source.words.filter((word) => {
          const isNewWord = word.level === 0;
          const isReviewTime =
            state.review.time - new Date(word.reviewed_at).getTime() >=
            state.review.levels[word.level].interval;
          return isNewWord || isReviewTime;
        });
      },
      readyTotal: ({ state }) => {
        return state.review.ready.length;
      },
      readyForTag: ({ state }) => (tag) => {
        return state.source.words.filter((word) => {
          const includesTag = word.tags.includes(tag);
          const isNewWord = word.level === 0;
          const isReviewTime =
            state.review.time - new Date(word.reviewed_at).getTime() >=
            state.review.levels[word.level].interval;
          return includesTag && (isNewWord || isReviewTime);
        });
      },
      readyForTagTotal: ({ state }) => (tag) => {
        return state.review.readyForTag(tag).length;
      },
      levels: {
        0: {
          name: 0,
          color: "",
          interval: 0,
        },
        1: {
          name: 1,
          color: "",
          interval: 2 * 60 * 60 * 1000, // 2 hours
        },
        2: {
          name: 2,
          color: "",
          interval: 4 * 60 * 60 * 1000, // 4 hours
        },
        3: {
          name: 3,
          color: "",
          interval: 8 * 60 * 60 * 1000, // 8 hours
        },
        4: {
          name: 4,
          color: "",
          interval: 24 * 60 * 60 * 1000, // 24 hours
        },
        5: {
          name: 5,
          color: "",
          interval: 2 * 24 * 60 * 60 * 1000, // 2 days
        },
        6: {
          name: 6,
          color: "",
          interval: 3 * 24 * 60 * 60 * 1000, // 3 days
        },
        7: {
          name: 7,
          color: "",
          interval: 5 * 24 * 60 * 60 * 1000, // 5 days
        },
        8: {
          name: 8,
          color: "",
          interval: 7 * 24 * 60 * 60 * 1000, // 1 week
        },
        9: {
          name: 9,
          color: "",
          interval: 14 * 24 * 60 * 60 * 1000, // 2 weeks
        },
        10: {
          name: 10,
          color: "",
          interval: 30 * 24 * 60 * 60 * 1000, // 1 month
        },
      },
    },
    settings: {
      reviewBundleSize: 10,
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
      afterCSR: async ({ state, actions }) => {
        observe(async () => {
          if (!!state.auth.user) {
            await Promise.all([
              actions.source.getAllWords(),
              actions.source.getAllTags(),
            ]);
            state.source.isSynced = true;
            state.review.time = Date.now();
          }
        });
      },
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
        const body = await response.json();

        state.source.tags.unshift(body);

        addTagForm.isSubmitting = false;
      },
      editTag: async ({ state }) => {
        const { editTagForm } = state.theme;

        editTagForm.isSubmitting = true;

        const endpoint = new URL("/tags/edit", state.auth.backend);
        const payload = {
          id: editTagForm.id,
          name: editTagForm.name.trim(),
        };
        const response = await fetch(endpoint.toString(), {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const body = await response.json();
        const index = state.source.tags.findIndex((tag) => tag.id === body.id);
        state.source.tags[index] = body;

        editTagForm.isSubmitting = false;
      },
      deleteTag: async ({ state, actions }) => {
        const { editTagForm } = state.theme;

        editTagForm.isSubmitting = true;

        const endpoint = new URL("/tags", state.auth.backend);
        const payload = {
          id: editTagForm.id,
        };
        await fetch(endpoint.toString(), {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const index = state.source.tags.findIndex(
          (tag) => tag.id === editTagForm.id
        );
        state.source.tags.splice(index, 1);
        await actions.source.getAllWords();

        editTagForm.isSubmitting = false;
      },
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
        const body = await response.json();

        state.source.words.unshift(body);

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
        const body = await response.json();
        const index = state.source.words.findIndex(
          (word) => word.id === body.id
        );
        state.source.words[index] = body;

        editWordForm.isSubmitting = false;
      },
      reviewWord: ({ state }) => async (id, level) => {
        const endpoint = new URL("/words/review", state.auth.backend);
        const payload = { id, level };
        const response = await fetch(endpoint.toString(), {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const body = await response.json();
        const index = state.source.words.findIndex(
          (word) => word.id === body.id
        );
        state.source.words[index] = body;
      },
      deleteWord: async ({ state }) => {
        const { editWordForm } = state.theme;

        editWordForm.isSubmitting = true;

        const endpoint = new URL("/words", state.auth.backend);
        const payload = {
          id: editWordForm.id,
        };
        await fetch(endpoint.toString(), {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const index = state.source.words.findIndex(
          (word) => word.id === editWordForm.id
        );
        state.source.words.splice(index, 1);

        editWordForm.isSubmitting = false;
      },
    },
    theme: {
      initAddWordForm: ({ state }) => (tag) => {
        const { addWordForm } = state.theme;
        addWordForm.tags.push(tag);
      },
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
      initEditTagForm: ({ state }) => (id) => {
        const tag = state.source.tags.find((tag) => tag.id === id);

        if (!tag) return;

        const { editTagForm } = state.theme;

        editTagForm.id = tag.id;
        editTagForm.name = tag.name;
      },
      updateEditTagField: ({ state }) => (name, value) => {
        const { editTagForm } = state.theme;

        editTagForm[name] = value;
      },
      resetEditTagForm: ({ state }) => {
        const { editTagForm } = state.theme;

        delete editTagForm.id;
        editTagForm.name = "";
      },
    },
    review: {
      afterCSR: async ({ state }) => {
        observe(async () => {
          if (!!state.auth.user) {
            state.review.time = Date.now();
          }
        });
      },
      init: ({ state }) => {
        const { parsedTag } = state.router;
        const reviewingWords = shuffle(
          (!parsedTag
            ? state.review.ready
            : state.review.readyForTag(parsedTag)
          ).map((word) => ({
            ...word,
            isCorrect: false,
            isFailed: false,
            failedTimes: 0,
          }))
        );
        state.review.reviewing = reviewingWords.slice(
          0,
          state.settings.reviewBundleSize
        );
      },
      reset: ({ state }) => {
        state.review.answer = "";
        state.review.status = "input";
        state.review.reviewing = [];
      },
      shuffle: ({ state }) => {
        state.review.reviewing = shuffle(state.review.reviewing);
      },
      updateAnswer: ({ state }) => (value) => {
        state.review.answer = value;
      },
      checkAnswer: async ({ state, actions }) => {
        const { review } = state;

        if (!review.current) return;

        if (review.current.spelling === review.answer.trim()) {
          review.status = "correct";

          if (review.current.isFailed && review.current.level) {
            await actions.review.levelDown();
          } else {
            await actions.review.levelUp();
          }

          review.current.isCorrect = true;
          review.answer = "";
          review.status = "input";
        } else {
          review.current.isFailed = true;
          review.current.failedTimes++;
          review.status = "failed";
        }
      },
      next: ({ state, actions }) => {
        if (state.review.current.level !== 0) actions.review.shuffle();
        state.review.answer = "";
        state.review.status = "input";
      },
      levelUp: async ({ state, actions }) => {
        const { current } = state.review;
        const level = current.level + 1;
        await actions.source.reviewWord(current.id, level);
      },
      levelDown: async ({ state, actions }) => {
        const { current } = state.review;
        const level = (() => {
          if (current.level <= 1) return current.level;
          const penaltyFactor = current.level >= 5 ? 2 : 1;
          const failedFactor = Math.ceil(current.failedTimes / 2);
          const downgradedLevel = current.level - penaltyFactor * failedFactor;
          return downgradedLevel >= 1 ? downgradedLevel : 1;
        })();
        await actions.source.reviewWord(current.id, level);
      },
    },
  },
};

export default theme;
