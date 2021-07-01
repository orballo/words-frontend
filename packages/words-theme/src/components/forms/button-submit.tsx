import React from "react";
import { connect, useConnect, css } from "frontity";
import { Packages } from "../../../types";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const ButtonSubmit: React.FC<Props> = ({ label, ...props }) => {
  const { state } = useConnect<Packages>();

  const buttonStyles = css`
    margin-top: 28px;
    min-height: 52px;
    box-sizing: border-box;
    width: 100%;
    display: block;
    padding: 0 12px;
    font-size: 18px;
    border: 2px solid ${state.theme.colors.textTwo};
    color: ${state.theme.colors.textTwo};
    background-color: ${state.theme.colors.bgTwo};
    cursor: pointer;

    &:disabled {
      color: ${state.theme.colors.textTwo}77;
      border: 2px solid ${state.theme.colors.textTwo}77;
    }
  `;

  return (
    <button css={buttonStyles} type="submit" {...props}>
      {label}
    </button>
  );
};

export default connect(ButtonSubmit, { injectProps: false });
