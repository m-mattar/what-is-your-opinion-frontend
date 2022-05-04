import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router"
import { VoteResultSearchPage } from "../Containers/VoteResultSearchPage";
import { VoteResultDisplayPage } from "../Containers/VoteResultDisplayPage";
import { VotingPage } from "../Containers/VotingPage";
import { QuestionCreationForm } from "../Containers/QuestionCreationForm";
import { ENCRYPTION_PHASE, RAW_ROUTES } from "../Utils/RouterUtils";
import { Question } from "../Models/Question";
import { votingService } from "../Services/VotingService";
import { urlUtils } from "../Utils/UrlUtils";
import { VoteEncryptionPhasesTrackingPage } from "../Containers/VoteEncrytionPhasesTrackingPage";
import { TRANSLATION_KEY } from "../Translations/TranslationUtils";

export function AppRouter() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Routes>
          <Route path={RAW_ROUTES.COLLECT_PHASE} element = {collectPhaseTrackingPageRender()}/>
          <Route path={RAW_ROUTES.DECRYPT_PHASE} element = {decryptPhaseTrackingPageRender()}/>
          <Route path={RAW_ROUTES.ENTITY_CREATE} element = {entityCreationFormRender()}/>
          <Route path={RAW_ROUTES.ENTITY_SEARCH} element = {entitySearchPageRender()}/>
          <Route path={RAW_ROUTES.QUESTION_CREATE} element={questionCreationFormRender()} />
          <Route path={RAW_ROUTES.QUESTION_VOTE} element={votingPageRender()} />
          <Route path={RAW_ROUTES.VOTE_RESULT_DISPLAY} element={resultDisplayPageRender()} />
          <Route path={RAW_ROUTES.VOTE_PHASE} element = {votePhaseTrackingPageRender()}/>
          <Route path={RAW_ROUTES.VOTE_RESULT_SEARCH} element={voteResultSearchPageRender()} />
          <Route element={fallbackPageRender()} />
        </Routes>
      </React.Fragment>
    </BrowserRouter>
  );
}

function collectPhaseTrackingPageRender() {
  return (
    <VoteEncryptionPhasesTrackingPage
      pageTitleTranslationKey={TRANSLATION_KEY.encryption_phase0_collect_success_title}
      pageNoteTranslationKey={TRANSLATION_KEY.encryption_phase0_collect_success_note}
      encryptionPhase={ENCRYPTION_PHASE.PHASE_0}
    />
  );
}

function decryptPhaseTrackingPageRender() {
  return (
    <VoteEncryptionPhasesTrackingPage
      pageTitleTranslationKey={TRANSLATION_KEY.encryption_phase2_decrypt_success_title}
      pageNoteTranslationKey={TRANSLATION_KEY.encryption_phase2_decrypt_success_note}
      encryptionPhase={ENCRYPTION_PHASE.PHASE_2}
    />
  );
}

function entityCreationFormRender() {
  //TODO: IMPLEMENT THIS
  return (<div></div>);
}

function entitySearchPageRender() {
  //TODO: IMPLEMENT THIS
  return (<div></div>);
}

function fallbackPageRender() {
  return (
    <VoteResultSearchPage/>
  );
}

function questionCreationFormRender() {
  return (
    <QuestionCreationForm/>
  );
}

function resultDisplayPageRender() {
  return (
    <VoteResultDisplayPage/>
  );
}

function votePhaseTrackingPageRender() {
  return (
    <VoteEncryptionPhasesTrackingPage
      pageTitleTranslationKey={TRANSLATION_KEY.encryption_phase1_vote_success_title}
      pageNoteTranslationKey={TRANSLATION_KEY.encryption_phase1_vote_success_note}
      encryptionPhase={ENCRYPTION_PHASE.PHASE_1}
    />
  );
}

function voteResultSearchPageRender() {
  return (
    <VoteResultSearchPage/>
  );
}

function votingPageRender() {
  let questionId: string = urlUtils.getQuestionId();
  let question: Question = votingService.getQuestionById(questionId)
  return (
    <VotingPage question={question}/>
  );
}