import React from "react";
import { connect, useConnect, css } from "frontity";
import { Packages } from "../../../types";

const MessageError: React.FC<{ message: string }> = ({ message }) => {
  const { state } = useConnect<Packages>();

  const paragraphStyles = css`
    font-size: 15px;
    padding: 0 16px;
    color: ${state.theme.colors.textError};
    text-align: center;
  `;

  return <p css={paragraphStyles}>{message}</p>;
};

export default connect(MessageError);
