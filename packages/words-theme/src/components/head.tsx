import React from "react";
import { connect, useConnect, Head as FrontityHead } from "frontity";
import { Packages } from "../../types";

const Head: React.FC = () => {
  const { state } = useConnect<Packages>();

  return (
    <FrontityHead>
      <html lang="en" />
      <title>{state.frontity.title}</title>
      <meta name="description" content={state.frontity.description} />
      <link rel="canonical" href="https://words.orballo.dev" />
      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="icon" type="image/svg+xml" href="/icons/logo.svg" />
    </FrontityHead>
  );
};

export default connect(Head);
