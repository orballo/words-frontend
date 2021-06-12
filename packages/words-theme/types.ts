import { Package, MergePackages } from "@frontity/types";
import VeryTinyRouter from "@orballo/very-tiny-router/types";

export default interface Theme extends Package {
  name: "words-theme";
}

export type Packages = MergePackages<Theme, VeryTinyRouter>;
