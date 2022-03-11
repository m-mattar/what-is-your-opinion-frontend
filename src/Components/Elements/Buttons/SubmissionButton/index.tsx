import * as React from "react";
import { BaseButton } from "../BaseButton";
import { translationProvider } from "../../../../Translations/TranslationProvider";
import { TRANSLATION_KEYS } from "../../../../Translations/TranslationUtils";

export const SUBMISSION_BUTTON_TYPE = {
  submit_voting_answer: "submit_voting_answer",
}

type SubmissionButtonProps = {
  request: JSON,
  type: string,
  isEnabled: boolean,
}

export function SubmissionButton(props: SubmissionButtonProps) {
  const onClick = () => {
    console.log("SUBMITTING")
  }

  return (
    <BaseButton
      onClick={onClick}
      title={translationProvider.getTranslation(TRANSLATION_KEYS.voting_page_submit_vote_button)}
      isEnabled={props.isEnabled}
    />
  );
}