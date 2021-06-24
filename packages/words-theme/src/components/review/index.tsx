import React from "react";
import { connect, useConnect, css } from "frontity";
import Counter from "./counter";
import ButtonClose from "../forms/button-close";
import { Packages } from "../../../types";

const Review: React.FC = () => {
  const { state, actions } = useConnect<Packages>();
  const [title, setTitle] = React.useState("");

  React.useEffect(() => {
    const { parsedTag } = state.router;
    if (parsedTag) {
      setTitle(state.source.tags.find((tag) => tag.id === parsedTag).name);
    }
  }, []);

  const headerStyles = css`
    display: flex;
  `;

  const containerStyles = css``;

  return (
    <>
      <div css={headerStyles}>
        <Counter />
        <ButtonClose />
      </div>
      <div css={containerStyles}>Review {title}</div>
    </>
  );
};

export default connect(Review);
