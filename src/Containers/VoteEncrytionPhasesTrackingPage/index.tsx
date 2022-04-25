import * as React from "react";
import { ReactElement } from "react";
import Auxiliary from "../../Components/HigherOrderComponents/Auxiliary";
import { Text, TEXT_TYPE } from "../../Components/Elements/Text";
import { EncryptionNote } from "../../Components/Elements/EncryptionNote";
import { TRANSLATION_KEY } from "../../Translations/TranslationUtils";
import { ENCRYPTION_PHASE } from "../../Utils/RouterUtils";
import { SuccessCheck } from "../../Components/Elements/SuccessCheck";
import { Button } from "../../Components/Elements/Button";
import { translationProvider } from "../../Translations/TranslationProvider";

type VoteEncryptionPhasesTrackingPageProps = {
  pageTitleTranslationKey: TRANSLATION_KEY,
  pageNoteTranslationKey: TRANSLATION_KEY,
  encryptionPhase: ENCRYPTION_PHASE,
}

export function VoteEncryptionPhasesTrackingPage(props: VoteEncryptionPhasesTrackingPageProps) {
  let buttonClassName: string = `button is-normal is-centered is-black is-responsive is-rounded`;
  let button: ReactElement = <div></div>

  const phaseOneButtonVerifyVotes = ():ReactElement => {
    return (
      <Button
        classname={buttonClassName}
        onClick={() => console.log("VERIFY CLICK")}
        title={translationProvider.getTranslation(
          TRANSLATION_KEY.encryption_phase1_vote_success_button
        )}
        isEnabled={true}
      />
    );
  }

  const phaseTwoButtonRedirectToVoteResultsPage = (): ReactElement => {
    return (
      <Button
        classname={buttonClassName}
        onClick={() => console.log("REDIRECT to Vote Results Page")}
        title={translationProvider.getTranslation(
          TRANSLATION_KEY.encryption_phase2_decrypt_success_button
        )}
        isEnabled={true}
      />
    );
  }

  if(props.encryptionPhase === ENCRYPTION_PHASE.PHASE_1) {
    button = phaseOneButtonVerifyVotes();
    console.log(button)
  } else if (props.encryptionPhase === ENCRYPTION_PHASE.PHASE_2) {
    button = phaseTwoButtonRedirectToVoteResultsPage();
  }

  return (
    <Auxiliary>
      <br/><br/>
      <EncryptionNote/>
      <br/><br/>
      <SuccessCheck/>
      <Text translationKey={props.pageTitleTranslationKey} textType={TEXT_TYPE.PAGE_TITLE}/>
      <br/>
      <Text translationKey={props.pageNoteTranslationKey} textType={TEXT_TYPE.PAGE_NOTE}/>
      <br/><br/>
      { button }
    </Auxiliary>
  );
}