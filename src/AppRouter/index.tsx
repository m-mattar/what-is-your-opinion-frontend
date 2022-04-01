import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router"
import { VoteResultSearchPage } from "../Containers/VoteResultSearchPage";
import { VoteResultDisplayPage } from "../Containers/VoteResultDisplayPage";
import { VotingPage } from "../Containers/VotingPage";
import { QuestionCreationForm } from "../Containers/QuestionCreationForm";
import { RAW_ROUTES } from "../Utils/RouterUtils";
import { Question } from "../Models/Question";
import { votingService } from "../Services/VotingService";
import { urlUtils } from "../Utils/UrlUtils";

export function AppRouter() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Routes>
          <Route path={RAW_ROUTES.RESULT_SEARCH} element={resultSearchPageRender()} />
          <Route path={RAW_ROUTES.RESULT_DISPLAY} element={resultDisplayPageRender()} />
          <Route path={RAW_ROUTES.QUESTION_VOTE} element={votingPageRender()} />
          <Route path={RAW_ROUTES.QUESTION_CREATE} element={questionCreationFormRender()} />
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

function fallbackPageRender() {
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

function questionCreationFormRender() {
  return (
    <QuestionCreationForm/>
  );
}