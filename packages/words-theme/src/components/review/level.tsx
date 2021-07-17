import React from "react";
import { css, connect, useConnect } from "frontity";
import { Packages } from "../../../types";

const Level: React.FC = () => {
  const { state } = useConnect<Packages>();

  const container = css`
    display: flex;
    margin-bottom: 24px;
    justify-content: center;
  `;

  const levelStyles = css`
    height: 4px;
    width: 4px;
    border: 2px solid ${state.theme.colors.textTwo};
    margin: 0 2px;
  `;

  const filledStyles = css`
    ${levelStyles}
    background-color: ${state.theme.colors.bgOne};
  `;

  return (
    <div css={container}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
        <div
          key={level}
          css={level <= state.review.current.level ? filledStyles : levelStyles}
        />
      ))}
    </div>
  );
};

export default connect(Level);
