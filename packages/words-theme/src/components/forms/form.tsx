import React from "react";
import { connect, useConnect, css } from "frontity";
import { Packages } from "../../../types";

interface Props extends React.FormHTMLAttributes<HTMLFormElement> {
  title: string;
}

const Form: React.FC<Props> = ({ title, children, ...props }) => {
  const { state } = useConnect<Packages>();

  const formStyles = css`
    background-color: ${state.theme.colors.bgTwo};
    color: ${state.theme.colors.textTwo};
    padding: 16px;
    height: calc(100vh - 52px);
    box-sizing: border-box;
  `;

  const titleStyles = css`
    text-transform: uppercase;
    margin: 0;
    margin-top: 12px;
    margin-bottom: 24px;
  `;

  return (
    <form css={formStyles} {...props}>
      <h2 css={titleStyles}>{title}</h2>
      {children}
    </form>
  );
};

export default connect(Form, { injectProps: false });
