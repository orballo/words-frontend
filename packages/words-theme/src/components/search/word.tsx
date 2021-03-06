import React from "react";
import { connect, useConnect, css } from "frontity";
import ButtonEdit from "../forms/button-edit";
import { Word as IWord, Packages } from "../../../types";

const Word: React.FC<{ word: IWord }> = ({ word }) => {
  const { state, actions } = useConnect<Packages>();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    actions.theme.initEditWordForm(word.id);
    actions.router.set("/edit-word");
  };

  const containerStyles = css`
    display: grid;
    grid-template-columns: 0.7fr 1fr 24px;
    align-items: center;
    justify-content: space-between;
    background-color: ${state.theme.colors.bgTwo};
    color: ${state.theme.colors.textTwo};
    padding: 12px;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;

    &:last-of-type {
      margin-bottom: 0;
      border-bottom: none;
    }
  `;

  return (
    <div css={containerStyles}>
      <span>{word.spelling}</span>
      <span>{word.meaning}</span>
      <ButtonEdit onClick={handleClick} />
    </div>
  );
};

export default connect(Word);
