import Auxiliary from "../../Components/HigherOrderComponents/Auxiliary";
import { VoteResult } from "../../Models/VoteResult/VoteResult";
import { resultService } from "../../Services/ResultService";
import { SearchPage } from "../../Components/HigherOrderComponents/SearchPage";
import { SEARCH_PAGE_TARGET } from "../../Components/HigherOrderComponents/SearchPage/Utils";
import { REDIRECTION_BUTTON_TYPE, RedirectionButton } from "../../Components/Elements/Buttons/RedirectionButton";

export function VoteResultSearchPage() {
  const fetchInitialData = () => {
    let initialResults: VoteResult[] = resultService.getInitialSearchPageResults();
    return initialResults;
  }

  return (
    <Auxiliary>
      <RedirectionButton
        type={REDIRECTION_BUTTON_TYPE.REDIRECT_TO_CREATE_QUESTION_PAGE}
        isEnabled={true}
      />
      <br/>
      <br/>
      <SearchPage
        searchPageTarget={SEARCH_PAGE_TARGET.VOTE_RESULTS}
        initialResults={fetchInitialData}
      />
    </Auxiliary>
  );
}