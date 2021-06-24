import React from "react";
import { connect, useConnect, css } from "frontity";
import { Packages } from "../../../types";

const Counter: React.FC = () => {
  const { state } = useConnect<Packages>();

  const containerStyles = css`
    height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  `;

  return <div css={containerStyles}>0/{state.review.readyTotal}</div>;
};

export default connect(Counter);
