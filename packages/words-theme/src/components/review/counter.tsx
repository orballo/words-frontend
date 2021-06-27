import React from "react";
import { connect, useConnect, css } from "frontity";
import { Packages } from "../../../types";

const Counter: React.FC = () => {
  const { state } = useConnect<Packages>();

  const containerStyles = css`
    height: 52px;
    min-width: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    padding-left: 12px;
    box-sizing: border-box;
  `;

  return <div css={containerStyles}>{state.review.remaining} remaining</div>;
};

export default connect(Counter);
