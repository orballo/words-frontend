import React from "react";
import { connect, useConnect, css } from "frontity";
import { Packages } from "../../../types";

const Final: React.FC = () => {
  const { state } = useConnect<Packages>();

  const containerStyles = css`
    margin-top: 32px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 32px;
    div {
      margin-bottom: 24px;
      text-align: center;
    }
  `;

  return (
    <div css={containerStyles}>
      <div>Correct {state.review.correct}%</div>
      <div>Incorrect {state.review.incorrect}%</div>
    </div>
  );
};

export default connect(Final);
