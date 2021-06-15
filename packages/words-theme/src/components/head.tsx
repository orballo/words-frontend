import React from "react";
import { connect, useConnect, Head as FrontityHead } from "frontity";
import { Packages } from "../../types";

const Head: React.FC = () => {
  const { state } = useConnect<Packages>();

  return (
    <FrontityHead>
      <title>{state.frontity.title}</title>
    </FrontityHead>
  );
};

export default connect(Head);
