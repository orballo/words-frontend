import React from "react";
import { connect, useConnect, css } from "frontity";
import { Packages } from "../../../types";

const Final: React.FC = () => {
  const { state } = useConnect<Packages>();
  const containerStyles = css``;

  return (
    <div css={containerStyles}>
      <div>Correct {state.review.correct}%</div>
      <div>Incorrect {state.review.incorrect}%</div>
    </div>
  );
};

export default connect(Final);
