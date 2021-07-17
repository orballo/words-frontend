import React, { KeyboardEvent } from "react";
import { connect, useConnect, css } from "frontity";
import Counter from "./counter";
import ButtonClose from "../forms/button-close";
import Loading from "../loading";
import ButtonSubmit from "../forms/button-submit";
import Final from "./final";
import Level from "./level";
import { Packages } from "../../../types";

const Review: React.FC = () => {
  const { state, actions } = useConnect<Packages>();
  const [title, setTitle] = React.useState("All the words");
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    actions.review.init();

    const { parsedTag } = state.router;
    if (parsedTag) {
      const tag = state.source.tags.find((tag) => tag.id === parsedTag);
      if (tag) setTitle(tag.name);
    }

    const handleEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (state.review.status === "failed") {
          actions.review.next();
        } else if (state.review.isFinish) {
          actions.router.set("/dashboard");
        }
      }
    };

    window.addEventListener("keydown", handleEnter as any);

    return () => {
      actions.review.reset();
      window.removeEventListener("keydown", handleEnter as any);
    };
  }, []);

  React.useEffect(() => {
    if (inputRef.current && state.review.status === "input") {
      inputRef.current.focus();
    }
  }, [state.review.status]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (state.review.status === "input") {
      actions.review.checkAnswer();
    } else {
      actions.review.next();
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    actions.review.updateAnswer(event.target.value);
  };

  const headerStyles = css`
    display: flex;
  `;

  const containerStyles = css`
    background-color: ${state.theme.colors.bgTwo};
    color: ${state.theme.colors.textTwo};
    height: 100%;
    padding: 16px;
    min-height: calc(100vh - 52px);
    box-sizing: border-box;
  `;

  const titleStyles = css`
    text-transform: uppercase;
    font-size: 18px;
    margin: 0;
    margin-bottom: 24px;
  `;

  const clueStyles = css`
    text-align: center;
    font-size: 22px;
    margin: 24px;
    margin-bottom: 12px;
  `;

  const answerInputStyles = css`
    width: 100%;
    font-size: 40px;
    border: none;
    background-color: ${state.theme.colors.bgOne};
    color: ${state.theme.colors.textOne};
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    outline: none;
  `;

  const inputWrapper = css`
    position: relative;
  `;

  const failedStyles = css`
    position: absolute;
    color: ${state.theme.colors.textError};
    bottom: 12px;
    text-align: center;
    width: 100%;
    font-size: 16px;

    span {
      font-size: 22px;
    }
  `;

  return !state.review.reviewing.length ? (
    <Loading />
  ) : (
    <>
      <div css={headerStyles}>
        <Counter />
        <ButtonClose />
      </div>
      {!state.review.isFinish ? (
        <form css={containerStyles} onSubmit={handleSubmit}>
          <h2 css={titleStyles}>Reviewing {title}</h2>
          <p css={clueStyles}>{state.review.current.meaning}</p>
          <Level />
          <div css={inputWrapper}>
            <input
              autoCorrect="false"
              autoComplete="false"
              autoCapitalize="false"
              ref={inputRef}
              css={answerInputStyles}
              type="text"
              value={state.review.answer}
              onChange={handleChange}
              autoFocus
              disabled={state.review.status !== "input"}
            />
            {state.review.status === "failed" && (
              <div css={failedStyles}>
                Incorrect! The answer is:{" "}
                <span>{state.review.current.spelling}</span>
              </div>
            )}
          </div>
          <ButtonSubmit
            label={state.review.status === "failed" ? "Next" : "Check"}
            disabled={state.review.status === "correct"}
          />
        </form>
      ) : (
        <Final />
      )}
    </>
  );
};

export default connect(Review);
