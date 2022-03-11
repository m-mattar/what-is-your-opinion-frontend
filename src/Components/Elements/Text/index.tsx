import * as React from "react";
import { translationProvider } from "../../../Translations/TranslationProvider";

export const TEXT_TYPE = {
  app_title: "app_title",
  page_title: "page_title",
}

type TextProps = {
  translationKey: string;
  textType: string;
}

export function Text(props: TextProps) {
  let classname = props.textType === TEXT_TYPE.app_title ? "title" : "subtitle";
  return (
    <h1 className={classname + " has-text-centered"}>
      {translationProvider.getTranslation(props.translationKey)}
    </h1>
  );
}