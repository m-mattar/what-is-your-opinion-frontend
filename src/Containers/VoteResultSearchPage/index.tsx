import Auxiliary from "../../Components/HigherOrderComponents/Auxiliary";
import { VoteResult } from "../../Models/VoteResult/VoteResult";
import { resultService } from "../../Services/ResultService";
import { SearchPage } from "../../Components/HigherOrderComponents/SearchPage";
import { SEARCH_PAGE_TARGET } from "../../Components/HigherOrderComponents/SearchPage/Utils";
import React from "react";
import { Button } from "../../Components/Elements/Button";
import { translationProvider } from "../../Translations/TranslationProvider";
import { TRANSLATION_KEY } from "../../Translations/TranslationUtils";
import { DISPLAY_TYPE } from "../../Components/HigherOrderComponents/SearchPage/Searchable";
import { redirectionProvider } from "../../Utils/RouterUtils";

export function VoteResultSearchPage() {
  const fetchInitialData = () => {
    let initialResults: VoteResult[] = resultService.getInitialVoteResults();
    return initialResults;
  }

  return (
    <Auxiliary>
      <br/><br/>
      <Button
        _id={"go-to-create-question-button"}
        classname={`button is-normal is-centered is-black is-responsive is-rounded`}
        onClick={redirectionProvider.redirectToQuestionCreationForm}
        isEnabled={true}
        title={translationProvider.getTranslation(TRANSLATION_KEY.create_question_page_redirect_button)}
      />
      <br/><br/>
      <SearchPage
        searchPageTarget={SEARCH_PAGE_TARGET.VOTE_RESULTS}
        initialResults={fetchInitialData}
        displayType={DISPLAY_TYPE.SINGLE_COLUMN}
      />
    </Auxiliary>
  );
}