import * as React from "react";
import { translationProvider } from "../../../Translations/TranslationProvider";
import { TRANSLATION_KEY } from "../../../Translations/TranslationUtils";

export const TEXT_TYPE = {
  app_title: "app_title",
  page_title: "page_title",
  page_subtitle: "page_subtitle",
}

type TextProps = {
  translationKey: TRANSLATION_KEY;
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