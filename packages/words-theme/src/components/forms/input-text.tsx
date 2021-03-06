import React from "react";
import { connect, useConnect, css } from "frontity";
import { Packages } from "../../../types";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const InputText: React.FC<Props> = ({ label, className, ...props }) => {
  const { state } = useConnect<Packages>();

  const labelStyles = css`
    display: block;
  `;

  const spanStyles = css`
    display: block;
    margin-bottom: 8px;
    font-size: 18px;
  `;

  const inputStyles = css`
    display: block;
    height: 52px;
    box-sizing: border-box;
    border: none;
    background-color: ${state.theme.colors.bgOne};
    color: ${state.theme.colors.textOne};
    width: 100%;
    outline: none;
    padding: 0 12px;
    font-size: 18px;
    margin-bottom: 16px;

    &::placeholder {
      color: ${state.theme.colors.textOne}55;
    }
  `;

  return (
    <label css={labelStyles} className={className}>
      <span css={spanStyles}>{label}</span>
      <input
        type="text"
        autoCapitalize="off"
        autoComplete="off"
        css={inputStyles}
        {...props}
      />
    </label>
  );
};

export default connect(InputText, { injectProps: false });
