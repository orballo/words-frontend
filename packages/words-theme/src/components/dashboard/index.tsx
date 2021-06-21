import React from "react";
import { connect, useConnect, css } from "frontity";
import Loading from "../loading";
import ButtonAddWord from "./button-add-word";
import ButtonAddTag from "./button-add-tag";
import ButtonReview from "./button-review";
import { Packages } from "../../../types";

const Dashboard: React.FC = () => {
  const { state } = useConnect<Packages>();

  const containerStyles = css`
    width: 100%;
    max-width: 1024px;
    min-height: 100%;
    margin: 52px auto;
    padding: 12px;
    box-sizing: border-box;
    background-color: ${state.theme.colors.bgTwo};
  `;

  const wrapperStyles = css`
    display: flex;
  `;

  return !state.auth.isSynced ? (
    <Loading />
  ) : (
    <div css={containerStyles}>
      <div css={wrapperStyles}>
        <ButtonAddWord />
        <ButtonAddTag />
        <ButtonReview />
      </div>
    </div>
  );
};

export default connect(Dashboard);
