import * as React from "react";
import { Text, TEXT_TYPE } from "../Text";
import { TRANSLATION_KEY } from "../../../Translations/TranslationUtils";

export function EncryptionNote() {
  return (
    <span className={"icon-text"}>
      <Text
        translationKey={TRANSLATION_KEY.voting_page_encryption_note}
        textType={TEXT_TYPE.PAGE_NOTE}
      />
      <span className={"icon is-small"}>
        <i className="fa-solid fa-lock"></i>
      </span>
    </span>
  );
}