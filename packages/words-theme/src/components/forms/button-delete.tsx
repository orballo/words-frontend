import React from "react";
import { connect, useConnect, css } from "frontity";
import { Packages } from "../../../types";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const ButtonDelete: React.FC<Props> = ({ label, ...props }) => {
  const { state } = useConnect<Packages>();

  const buttonStyles = css`
    margin-top: 28px;
    min-height: 44px;
    box-sizing: border-box;
    width: 100%;
    display: block;
    padding: 0 12px;
    font-size: 16px;
    border: 2px solid ${state.theme.colors.textError};
    color: ${state.theme.colors.textError};
    background-color: ${state.theme.colors.bgTwo};
    cursor: pointer;

    &:disabled {
      color: ${state.theme.colors.textError}77;
      border: 2px solid ${state.theme.colors.textError}77;
    }
  `;

  return (
    <button css={buttonStyles} type="button" {...props}>
      {label}
    </button>
  );
};

export default connect(ButtonDelete, { injectProps: false });
