import React from "react";
import { connect, useConnect, css } from "frontity";
import Loading from "../loading";
import Tag from "./tag";
import Footer from "./footer";
import { Packages } from "../../../types";

const Dashboard: React.FC = () => {
  const { state, actions } = useConnect<Packages>();

  const containerStyles = css`
    width: 100%;
    max-width: 1024px;
    min-height: 100%;
    margin: auto;
    margin-bottom: 52px;
    padding: 16px 12px;
    box-sizing: border-box;
    background: none;
  `;

  const loadingStyles = css`
    @media (max-width: 1023px) {
      min-height: calc(100vh - 52px - 52px - 16px);
    }
  `;

  return !state.source.isSynced ? (
    <Loading />
  ) : (
    <>
      <div css={containerStyles}>
        {state.source.isRequestingTags ? (
          <Loading css={loadingStyles} />
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
