import React from "react";
import { connect, useConnect, css } from "frontity";
import Loading from "../loading";
import ButtonClose from "../forms/button-close";
import Form from "../forms/form";
import InputSearch from "../forms/input-search";
import Word from "./word";

import { Packages } from "../../../types";

const Search: React.FC = () => {
  const { state, actions } = useConnect<Packages>();
  const { searchForm } = state.theme;
  const [title, setTitle] = React.useState("All the words");

  React.useEffect(() => {
    if (state.source.isSynced) {
      const { parsedTag } = state.router;

      if (parsedTag) {
        const tagName = state.source.tags.find((tag) => tag.id === parsedTag)
          .name;
        setTitle(tagName);
      }
    }

    return () => actions.theme.resetSearchForm();
  }, [state.source.isSynced]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    actions.theme.updateSearchField(event.target.name, event.target.value);
  };

  const mainStyles = css`
    width: 100%;
    max-width: 1024px;
    min-height: calc(100% - 52px);
    margin: auto;
    padding-top: 0;
    box-sizing: border-box;
    background: none;
  `;

  const loadingStyles = css`
    @media (max-width: 1023px) {
      min-height: calc(100vh - 52px - 52px - 16px);
    }
  `;

  const wordsWrapper = css`
    margin-top: 24px;
  `;

  return (
    <>
      <ButtonClose />
      <main css={mainStyles}>
        {state.source.isRequestingWords ? (
          <Loading css={loadingStyles} />
        ) : (
          <Form title={title} onSubmit={(event) => event.preventDefault()}>
            <InputSearch
              name="search"
              value={searchForm.search}
              onChange={handleChange}
            />
            <div css={wordsWrapper}></div>
            {state.theme.searchForm.filteredWords.map((word) => (
              <Word key={word.id} word={word} />
            ))}
          </Form>
        )}
      </main>
    </>
  );
};

export default connect(Search);
