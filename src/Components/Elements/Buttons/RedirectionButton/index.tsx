import * as React from "react";
import { BaseButton } from "../BaseButton";
import { translationProvider } from "../../../../Translations/TranslationProvider";
import { TRANSLATION_KEY } from "../../../../Translations/TranslationUtils";

export enum REDIRECTION_BUTTON_TYPE {
  REDIRECT_TO_CREATE_QUESTION_PAGE,
}

type RedirectionButtonProps = {
  type: REDIRECTION_BUTTON_TYPE,
  isEnabled: boolean,
}

export function RedirectionButton(props: RedirectionButtonProps) {
  const onClick = () => {
    console.log("REDIRECTING")
    // This is reloading the entire page
    //TODO: Need to re-route instead
    window.location.assign("/create");
  }

  return (
    <BaseButton
      classname={`button is-normal is-centered is-black is-responsive is-rounded`}
      onClick={onClick}
      title={translationProvider.getTranslation(TRANSLATION_KEY.create_question_page_redirect_button)}
      isEnabled={props.isEnabled}
    />
  );
}