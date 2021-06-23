import React from "react";
import { connect, useConnect, css } from "frontity";
import IconEdit from "../icons/icon-edit";
import IconWord from "../icons/icon-word";
import IconReview from "../icons/icon-review";
import { Packages, Tag as ITag } from "../../../types";

const Tag: React.FC<{ tag: ITag }> = ({ tag }) => {
  const { state, actions } = useConnect<Packages>();

  const handleEditTag: React.MouseEventHandler<HTMLButtonElement> = () => {
    actions.theme.initEditTagForm(tag.id);
    actions.router.set(`/edit-tag`);
  };

  const handleTagSearch: React.MouseEventHandler<HTMLButtonElement> = () => {
    actions.router.set(`/search/${tag.id}`);
  };

  const handleAddWord: React.MouseEventHandler<HTMLButtonElement> = () => {
    actions.theme.initAddWordForm(tag.id);
    actions.router.set("/add-word");
  };

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

  const buttonTagStyles = css`
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
    font-size: 16px;
    height: 100%;
    flex-grow: 1;
    text-align: left;
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
    cursor: pointer;
  `;

  const iconStyles = css`
    height: 18px;
    width: 18px;
  `;

  return (
    <div css={containerStyles}>
      <button type="button" css={buttonTagStyles} onClick={handleTagSearch}>
        {tag.name}
      </button>
      <div css={buttonsWrapper}>
        <button type="button" css={buttonStyles} onClick={handleEditTag}>
          <IconEdit css={iconStyles} />
        </button>
        <button type="button" css={buttonStyles} onClick={handleAddWord}>
          <IconWord css={iconStyles} />
        </button>
        <button type="button" css={buttonStyles}>
          <IconReview css={iconStyles} />
        </button>
      </div>
    </div>
  );
};

export default connect(Tag);
