import * as React from "react";
import { BaseButton } from "../BaseButton";
import { translationProvider } from "../../../../Translations/TranslationProvider";
import { TRANSLATION_KEY } from "../../../../Translations/TranslationUtils";
import "./style.css"

export enum SUBMISSION_BUTTON_TYPE {
  SUBMIT_VOTE,
}

type SubmissionButtonProps = {
  onClick: any,
  type: SUBMISSION_BUTTON_TYPE,
  isEnabled: boolean,
}

export function SubmissionButton(props: SubmissionButtonProps) {
  return (
    <BaseButton
      classname={"button button-color is-white is-medium is-responsive is-rounded"}
      onClick={props.onClick}
      title={translationProvider.getTranslation(TRANSLATION_KEY.voting_page_submit_vote_button)}
      isEnabled={props.isEnabled}
    />
  );
}