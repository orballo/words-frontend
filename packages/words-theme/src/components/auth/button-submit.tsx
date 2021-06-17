import React from "react";
import { connect, useConnect, css } from "frontity";
import { Packages } from "../../../types";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const ButtonSubmit: React.FC<Props> = ({ label, ...props }) => {
  const { state } = useConnect<Packages>();

  const buttonStyles = css`
    margin-top: 24px;
    min-height: 44px;
    box-sizing: border-box;
    width: 100%;
    display: block;
    padding: 0 12px;
    font-size: 16px;
    border: 2px solid;
    color: ${state.theme.colors.textTwo};
    background-color: ${state.theme.colors.bgTwo};
    cursor: pointer;

    &:hover {
      color: ${state.theme.colors.bgTwo};
      background-color: ${state.theme.colors.textTwo};
      border-color: ${state.theme.colors.textTwo};
    }
  `;

  return (
    <button css={buttonStyles} type="submit" {...props}>
      {label}
    </button>
  );
};

export default connect(ButtonSubmit, { injectProps: false });
