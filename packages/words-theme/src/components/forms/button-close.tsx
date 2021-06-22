import React from "react";
import { connect, useConnect, css } from "frontity";
import IconClose from "../icons/icon-close";
import { Packages } from "../../../types";

const ButtonClose: React.FC<{
  onClick?: (event: React.MouseEvent) => void;
}> = ({ onClick }) => {
  const { state, actions } = useConnect<Packages>();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onClick) onClick(event);
    else {
      actions.router.set("/dashboard");
    }
  };

  const buttonStyles = css`
    background: none;
    color: ${state.theme.colors.textOne};
    border: none;
    height: 52px;
    width: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    padding: 0;
  `;

  return (
    <button css={buttonStyles} onClick={handleClick}>
      <IconClose />
    </button>
  );
};

export default connect(ButtonClose);
