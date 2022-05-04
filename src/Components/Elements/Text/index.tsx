import * as React from "react";
import { translationProvider } from "../../../Translations/TranslationProvider";
import { TRANSLATION_KEY } from "../../../Translations/TranslationUtils";
import "./style.css"

export enum TEXT_TYPE {
  APP_TITLE,
  PAGE_TITLE,
  PAGE_SUBTITLE,
  PAGE_NOTE,
  NORMAL_TEXT,
}

export const textTypeToClassName = new Map<TEXT_TYPE, string>([
  [TEXT_TYPE.APP_TITLE, "app-title title has-text-centered"],
  [TEXT_TYPE.PAGE_TITLE,  "subtitle is-size-4 has-text-centered has-text-weight-bold"],
  [TEXT_TYPE.PAGE_SUBTITLE,  "subtitle"],
  [TEXT_TYPE.PAGE_NOTE,  "subtitle is-size-6 has-text-centered has-text-weight-bold has-text-grey"],
  [TEXT_TYPE.NORMAL_TEXT, ""]
]);

type TextProps = {
  translationKey: TRANSLATION_KEY;
  textType: TEXT_TYPE;
}

export function Text(props: TextProps) {
  let classname = textTypeToClassName.get!(props.textType);

  return (
    <span className={classname}>
      {translationProvider.getTranslation(props.translationKey)}
    </span>
  );
}