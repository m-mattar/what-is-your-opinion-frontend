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
          <Route path={RAW_ROUTES.RESULT_SEARCH} element={resultSearchPageRender()} />
          <Route path={RAW_ROUTES.RESULT_DISPLAY} element={resultDisplayPageRender()} />
          <Route path={RAW_ROUTES.QUESTION_VOTE} element={votingPageRender()} />
          <Route path={RAW_ROUTES.QUESTION_CREATE} element={questionCreationFormRender()} />
          <Route path={RAW_ROUTES.COLLECT_PHASE} element = {collectPhaseTrackingPageRender()}/>
          <Route path={RAW_ROUTES.VOTE_PHASE} element = {votePhaseTrackingPageRender()}/>
          <Route path={RAW_ROUTES.DECRYPT_PHASE} element = {decryptPhaseTrackingPageRender()}/>
          <Route element={fallbackPageRender()} />
        </Routes>
      </React.Fragment>
    </BrowserRouter>
  );
}

function resultSearchPageRender() {
  return (
    <VoteResultSearchPage/>
  );
}

function resultDisplayPageRender() {
  return (
    <VoteResultDisplayPage/>
  );
}

function votingPageRender() {
  let questionId: string = urlUtils.getQuestionId();
  let question: Question = votingService.getQuestionById(questionId)
  return (
    <VotingPage question={question}/>
  );
}

function questionCreationFormRender() {
  return (
    <QuestionCreationForm/>
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

function votePhaseTrackingPageRender() {
  return (
    <VoteEncryptionPhasesTrackingPage
      pageTitleTranslationKey={TRANSLATION_KEY.encryption_phase1_vote_success_title}
      pageNoteTranslationKey={TRANSLATION_KEY.encryption_phase1_vote_success_note}
      encryptionPhase={ENCRYPTION_PHASE.PHASE_1}
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

function fallbackPageRender() {
  return (
    <VoteResultSearchPage/>
  );
}