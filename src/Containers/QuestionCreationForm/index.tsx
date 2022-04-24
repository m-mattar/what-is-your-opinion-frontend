import Auxiliary from "../../Components/HigherOrderComponents/Auxiliary";
import { Text, TEXT_TYPE } from "../../Components/Elements/Text";
import { TRANSLATION_KEY } from "../../Translations/TranslationUtils";
import { SearchPage } from "../../Components/HigherOrderComponents/SearchPage";
import { SEARCH_PAGE_TARGET } from "../../Components/HigherOrderComponents/SearchPage/Utils";
import { VoteResult } from "../../Models/VoteResult/VoteResult";
import { resultService } from "../../Services/ResultService";

export function QuestionCreationForm() {
  const fetchInitialData = () => {
    let initialResults: VoteResult[] = resultService.getInitialSearchPageResults();
    return initialResults;
  }

  return (
    <Auxiliary>
      <Text
        translationKey={TRANSLATION_KEY.create_question_page_title}
        textType={TEXT_TYPE.page_title}
      />

      <SearchPage
        searchPageTarget={SEARCH_PAGE_TARGET.ENTITY_CATEGORIES}
        initialResults={fetchInitialData()} //TODO: Add Initial Results
      />
    </Auxiliary>
  );
}