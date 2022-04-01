import * as React from "react";
import { BaseButton } from "../BaseButton";
import { translationProvider } from "../../../../Translations/TranslationProvider";
import { TRANSLATION_KEY } from "../../../../Translations/TranslationUtils";

export enum SUBMISSION_BUTTON_TYPE {
  SUBMIT_VOTE,
}

type SubmissionButtonProps = {
  request: JSON,
  type: SUBMISSION_BUTTON_TYPE,
  isEnabled: boolean,
}

export function SubmissionButton(props: SubmissionButtonProps) {
  const onClick = () => {
    console.log("SUBMITTING")
  }

  return (
    <BaseButton
      classname={"button is-medium is-light is-responsive"}
      onClick={onClick}
      title={translationProvider.getTranslation(TRANSLATION_KEY.voting_page_submit_vote_button)}
      isEnabled={props.isEnabled}
    />
  );
}