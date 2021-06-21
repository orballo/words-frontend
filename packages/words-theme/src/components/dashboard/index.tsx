import React from "react";
import { connect, useConnect, css } from "frontity";
import Loading from "../loading";
import Tag from "./tag";
import Footer from "./footer";
import { Packages } from "../../../types";

const Dashboard: React.FC = () => {
  const { state, actions } = useConnect<Packages>();

  React.useEffect(() => {
    actions.source.getAllTags();
  }, []);

  const containerStyles = css`
    width: 100%;
    max-width: 1024px;
    min-height: 100%;
    margin: auto;
    margin-bottom: 52px;
    padding: 16px 12px;
    box-sizing: border-box;
    background-color: ${state.theme.colors.bgTwo};
    background: none;
    color: ${state.theme.colors.textTwo};
  `;

  return !state.auth.isSynced ? (
    <Loading />
  ) : (
    <>
      <div css={containerStyles}>
        {state.source.isRequestingTags ? (
          <Loading />
        ) : (
          <div>
            {state.source.tags.map((tag) => (
              <Tag key={tag.id} tag={tag} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default connect(Dashboard);
