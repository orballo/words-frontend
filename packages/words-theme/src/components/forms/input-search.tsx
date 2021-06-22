import React from "react";
import { connect, useConnect, css } from "frontity";
import IconSearch from "../icons/icon-search";
import { Packages } from "../../../types";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputSearch: React.FC<Props> = ({ ...props }) => {
  const { state } = useConnect<Packages>();

  const labelStyles = css`
    display: block;
    position: relative;
    width: 100%;
  `;

  const inputStyles = css`
    height: 44px;
    box-sizing: border-box;
    border: none;
    background-color: ${state.theme.colors.bgOne};
    color: ${state.theme.colors.textOne};
    width: 100%;
    outline: none;
    padding: 0 12px;
    padding-right: 36px;
    font-size: 16px;

    &::placeholder {
      color: ${state.theme.colors.textOne}55;
    }

    &:disabled {
      opacity: 0.8;
    }
  `;

  const iconStyles = css`
    position: absolute;
    right: 8px;
    top: calc(50% - 12px);

    height: 24px;
    width: 24px;
    margin: auto 0;
    color: ${state.theme.colors.textOne};
  `;

  return (
    <label css={labelStyles}>
      <input type="text" css={inputStyles} placeholder="Search..." {...props} />
      <IconSearch css={iconStyles} />
    </label>
  );
};

export default connect(InputSearch, { injectProps: false });
