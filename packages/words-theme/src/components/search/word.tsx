import React from "react";
import { connect, useConnect, css } from "frontity";
import { Word as IWord, Packages } from "../../../types";

const Word: React.FC<{ word: IWord }> = ({ word }) => {
  const { state } = useConnect<Packages>();

  const containerStyles = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${state.theme.colors.bgTwo};
    color: ${state.theme.colors.textTwo};
    padding: 12px;
    box-sizing: border-box;

    &:last-of-type {
      margin-bottom: 0;
    }
  `;

  return (
    <div css={containerStyles}>
      {word.spelling} {word.meaning}
    </div>
  );
};

export default connect(Word);
