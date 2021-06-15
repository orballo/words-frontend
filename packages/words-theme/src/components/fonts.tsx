import React from "react";
import { css, connect, Global } from "frontity";
import PromptRegular from "../../fonts/Prompt-Regular.ttf";
import PromptMedium from "../../fonts/Prompt-Medium.ttf";

const Fonts: React.FC = () => {
  const fonts = css`
    @font-face {
      font-family: "Prompt";
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(${PromptRegular}) format("truetype");
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
        U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
        U+2212, U+2215, U+FEFF, U+FFFD;
    }
    @font-face {
      font-family: "Prompt";
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url(${PromptMedium}) format("truetype");
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6,
        U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193,
        U+2212, U+2215, U+FEFF, U+FFFD;
    }
  `;

  return <Global styles={fonts} />;
};

export default connect(Fonts, { injectProps: false });
