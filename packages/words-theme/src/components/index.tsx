import React from "react";
import { connect } from "frontity";
import Head from "./head";
import Fonts from "./fonts";
import Styles from "./styles";
import Main from "./main";

const Root: React.FC = () => (
  <>
    <Head />
    <Fonts />
    <Styles />
    <Main />
  </>
);

export default connect(Root);
