import React from "react";
import { connect } from "frontity";
import Head from "./head";
import Fonts from "./fonts";
import Styles from "./styles";
import Sw from "./sw";
import Main from "./main";

const Root: React.FC = () => (
  <>
    <Head />
    <Fonts />
    <Styles />
    <Sw />
    <Main />
  </>
);

export default connect(Root);
