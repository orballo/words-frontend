import React from "react";
import { connect, useConnect, css } from "frontity";
import ButtonFooter from "./button-footer";
import IconSearch from "../icons/icon-search";
import IconWord from "../icons/icon-word";
import IconTag from "../icons/icon-tag";
import IconReview from "../icons/icon-review";
import { Packages } from "../../../types";

const Footer: React.FC = () => {
  const { state, actions } = useConnect<Packages>();

  const handleSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    actions.router.set("/search");
  };

  const handleAddWord: React.MouseEventHandler<HTMLButtonElement> = () => {
    actions.router.set("/add-word");
  };

  const handleAddTag: React.MouseEventHandler<HTMLButtonElement> = () => {
    actions.router.set("/add-tag");
  };

  const handleReview: React.MouseEventHandler<HTMLButtonElement> = () => {
    actions.router.set("/review");
  };

  const footerStyles = css`
    position: fixed;
    left: 0;
    bottom: 0;
    height: 52px;
    width: 100%;
    display: flex;
    background-color: ${state.theme.colors.bgTwo};
    box-shadow: 0 0 4px 0 ${state.theme.colors.textTwo};

    @media (min-width: 768px) {
      position: absolute;
      width: 52px;
      flex-direction: column;
      height: calc(52px * 4);
      top: 16px;
      left: -56px;
    }
  `;

  return (
    <footer css={footerStyles}>
      <ButtonFooter Icon={IconSearch} onClick={handleSearch} />
      <ButtonFooter Icon={IconWord} onClick={handleAddWord} />
      <ButtonFooter Icon={IconTag} onClick={handleAddTag} />
      <ButtonFooter isReview Icon={IconReview} onClick={handleReview} />
    </footer>
  );
};

export default connect(Footer);
