import React from "react";
import { connect, useConnect, css } from "frontity";
import { Packages } from "../../../types";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputText: React.FC<Props> = ({ label, ...props }) => {
  const { state } = useConnect<Packages>();

  const spanStyles = css`
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
  `;

  const inputStyles = css`
    display: block;
    height: 44px;
    box-sizing: border-box;
    border: none;
    background-color: ${state.theme.colors.bgOne};
    color: ${state.theme.colors.textOne};
    width: 100%;
    outline: none;
    padding: 0 12px;
    font-size: 16px;
    margin-bottom: 16px;

    &::placeholder {
      color: ${state.theme.colors.textOne}55;
    }

    &:disabled {
      opacity: 0.8;
    }
  `;

  return (
    <label>
      <span css={spanStyles}>{label}</span>
      <input type="text" css={inputStyles} {...props} />
    </label>
  );
};

export default connect(InputText, { injectProps: false });
