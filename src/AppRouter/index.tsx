import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router"
import { ResultSearchPage } from "../Containers/ResultSearchPage";
import { ResultDisplayPage } from "../Containers/ResultDisplayPage";
import { VotingPage } from "../Containers/VotingPage";
import { QuestionCreationForm } from "../Containers/QuestionCreationForm";
import { RAW_ROUTES } from "./RouterUtils";

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
    <ResultSearchPage/>
  );
}

function resultDisplayPageRender() {
  return (
    <ResultDisplayPage/>
  );
}

function fallbackPageRender() {
  return (
    <ResultSearchPage/>
  );
}

function votingPageRender() {
  return (
    <VotingPage/>
  );
}

function questionCreationFormRender() {
  return (
    <QuestionCreationForm/>
  );
}