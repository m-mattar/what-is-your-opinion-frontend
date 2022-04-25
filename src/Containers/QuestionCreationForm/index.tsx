import Auxiliary from "../../Components/HigherOrderComponents/Auxiliary";
import { Text, TEXT_TYPE } from "../../Components/Elements/Text";
import { TRANSLATION_KEY } from "../../Translations/TranslationUtils";
import { SearchPage } from "../../Components/HigherOrderComponents/SearchPage";
import { SEARCH_PAGE_TARGET } from "../../Components/HigherOrderComponents/SearchPage/Utils";
import { VoteResult } from "../../Models/VoteResult/VoteResult";
import { resultService } from "../../Services/ResultService";
import { EntityCategory } from "../../Models/EntityCategory/EntityCategory";
import { entityService } from "../../Services/EntityService";
import * as React from "react";

export function QuestionCreationForm() {
  const fetchInitialData = () => {
    let initialResults: EntityCategory[] = entityService.getEntityCategories();
    return initialResults;
  }

  return (
    <Auxiliary>
      <br/>
      <br/>
      <Text
        translationKey={TRANSLATION_KEY.create_question_page_title}
        textType={TEXT_TYPE.PAGE_TITLE}
      />

      <SearchPage
        searchPageTarget={SEARCH_PAGE_TARGET.ENTITY_CATEGORIES}
        initialResults={fetchInitialData}
      />
    </Auxiliary>
  );
}