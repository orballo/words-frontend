import React from "react";
import { connect, useConnect, css } from "frontity";
import Tag from "./tag";
import Footer from "./footer";
import { Packages } from "../../../types";

const Dashboard: React.FC = () => {
  const { state } = useConnect<Packages>();

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

  return (
    <>
      <main css={containerStyles}>
        <div>
          {state.source.tags.map((tag) => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default connect(Dashboard);
