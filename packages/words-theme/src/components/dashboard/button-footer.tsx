import { connect, useConnect, css } from "frontity";
import React from "react";
import { Packages } from "../../../types";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  Icon: React.FC;
}

const ButtonFooter: React.FC<Props> = ({ label, Icon, ...props }) => {
  const buttonStyles = css`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    flex-grow: 1;
    box-shadow: 0 0 1px 0 #aaaaaa;
  `;

  const iconStyles = css`
    height: 24px;
    width: 24px;
  `;

  return (
    <button css={buttonStyles} {...props}>
      {label ? label : ""}
      <Icon css={iconStyles} />
    </button>
  );
};

export default connect(ButtonFooter, { injectProps: false });
