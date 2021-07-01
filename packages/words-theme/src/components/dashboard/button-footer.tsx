import { connect, useConnect, css } from "frontity";
import React from "react";
import { Packages } from "../../../types";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  isReview?: boolean;
  Icon: React.FC;
}

const ButtonFooter: React.FC<Props> = ({
  label,
  isReview = false,
  Icon,
  ...props
}) => {
  const { state } = useConnect<Packages>();

  const buttonStyles = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    flex-grow: 1;
    box-shadow: 0 0 1px 0 #aaaaaa;

    &:disabled {
      color: ${state.theme.colors.textTwo}77;
    }

    @media (min-width: 768px) {
      min-height: 52px;
    }
  `;

  const iconStyles = css`
    height: 24px;
    width: 24px;
  `;

  const badgeStyles = css`
    position: absolute;
    border-radius: 50px;
    font-size: 12px;
    color: ${state.theme.colors.textOne};
    background-color: ${state.theme.colors.textError};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 16px;
    min-width: 16px;
    top: 6px;
    right: 24px;
    padding: 1px 1px;
  `;

  return (
    <button
      css={buttonStyles}
      {...props}
      disabled={isReview && !state.review.readyTotal}
    >
      {label ? label : ""}
      <Icon css={iconStyles} />
      {isReview && !!state.review.readyTotal && (
        <span css={badgeStyles}>{state.review.readyTotal}</span>
      )}
    </button>
  );
};

export default connect(ButtonFooter, { injectProps: false });
