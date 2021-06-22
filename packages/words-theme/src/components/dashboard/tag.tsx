import React from "react";
import { connect, useConnect, css } from "frontity";
import IconSearch from "../icons/icon-search";
import IconWord from "../icons/icon-word";
import IconReview from "../icons/icon-review";
import { Packages, Tag as ITag } from "../../../types";

const Tag: React.FC<{ tag: ITag }> = ({ tag }) => {
  const { state } = useConnect<Packages>();

  const containerStyles = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${state.theme.colors.bgTwo};
    color: ${state.theme.colors.textTwo};
    height: 44px;
    margin-bottom: 12px;
    padding-left: 12px;
    padding-right: 3px;
    box-sizing: border-box;
    box-shadow: 0 0 4px 0 ${state.theme.colors.textTwo};

    &:last-of-type {
      margin-bottom: 0;
    }
  `;

  const buttonsWrapper = css`
    display: flex;
  `;

  const buttonStyles = css`
    background: none;
    border: none;
    color: ${state.theme.colors.textTwo};
    width: 38px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  `;

  const iconStyles = css`
    height: 18px;
    width: 18px;
  `;

  return (
    <div css={containerStyles}>
      <div>{tag.name}</div>
      <div css={buttonsWrapper}>
        <button css={buttonStyles}>
          <IconWord css={iconStyles} />
        </button>
        <button css={buttonStyles}>
          <IconReview css={iconStyles} />
        </button>
      </div>
    </div>
  );
};

export default connect(Tag);
