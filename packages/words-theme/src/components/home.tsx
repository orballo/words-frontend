import React from "react";
import { connect, useConnect, css } from "frontity";
import Link from "@orballo/very-tiny-router/link";
import Logo from "./logo";
import Auth from "./auth";
import { Packages } from "../../types";

const Main: React.FC = () => {
  const { state } = useConnect<Packages>();

  const containerStyles = css`
    width: 100%;
    padding: 100px 0;
  `;

  const logoStyles = css`
    width: 240px;
    height: auto;
    display: block;
    margin: 0 auto 60px auto;
  `;

  const descriptionStyles = css`
    padding: 0 44px;
    display: inline-block;
    text-align: center;
    font-weight: 300;
    font-size: 20px;

    span {
      background-color: ${state.theme.colors.bgOne};

      b {
        color: #f6dfeb;
        font-weight: 500;
      }
    }

    ${state.router.isAuth && "display: none;"}
  `;

  const linksWrapperStyles = css`
    font-size: 30px;
    margin: auto;
    margin-top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      margin: 0 20px;
    }

    ${state.router.isAuth && "display: none;"}
  `;

  const linkStyles = css`
    font-size: 30px;
    text-transform: uppercase;
    font-weight: 500;
    background-color: ${state.theme.colors.bgOne};
  `;

  return (
    <div css={containerStyles}>
      <div>
        <Logo css={logoStyles} />
        <p css={descriptionStyles}>
          <span>
            <b>Words</b> is a tool based on <b>spaced repetition</b> that will
            help you to memorize your <b>vocabulary</b>.
          </span>
        </p>
        <p css={descriptionStyles}>
          <span>
            Currently it focuses on <b>Korean</b>, but it might evolve to
            support other languages in the future.
          </span>
        </p>
        <div css={linksWrapperStyles}>
          <Link css={linkStyles} link="/signin">
            Sign in
          </Link>
          <span>|</span>
          <Link css={linkStyles} link="/signup">
            Sign up
          </Link>
        </div>
      </div>
      <Auth />
    </div>
  );
};

export default connect(Main);
