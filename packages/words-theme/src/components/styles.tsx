import React from "react";
import { connect, useConnect, Global, css } from "frontity";
import { Packages } from "../../types";

const Styles: React.FC = () => {
  const { state } = useConnect<Packages>();

  const styles = css`
    body {
      margin: 0;
      font-family: "Prompt";
      color: ${state.theme.colors.textOne};
      background-color: ${state.theme.colors.bgOne};
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fbfbfb' fill-opacity='0.07' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
    }

    button,
    input {
      font-family: "Prompt";
    }

    a {
      color: ${state.theme.colors.textOne};
      -webkit-tap-highlight-color: transparent;
    }

    @media (min-width: 1024px) {
      html,
      body,
      #root {
        height: 100%;
      }
    }
  `;

  return <Global styles={styles} />;
};

export default connect(Styles);
