import React from "react";
import { connect, useConnect, css } from "frontity";
import IconEdit from "../icons/icon-edit";
import { Packages } from "../../../types";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonClose: React.FC<Props> = ({ ...props }) => {
  const { state, actions } = useConnect<Packages>();

  const buttonStyles = css`
    background: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    padding: 0;
  `;

  const iconStyles = css`
    height: 24px;
    width: 24px;
  `;

  return (
    <button type="button" css={buttonStyles} {...props}>
      <IconEdit css={iconStyles} />
    </button>
  );
};

export default connect(ButtonClose, { injectProps: false });
