import React, { useEffect, useState } from "react";
import Auxiliary from "../../Components/HigherOrderComponents/Auxiliary";
import { Result } from "../../Models/Result";
import { resultService } from "../../Services/ResultService";
import { Text, TEXT_TYPE } from "../../Components/Elements/Text";
import { TRANSLATION_KEY } from "../../Translations/TranslationUtils";
import { SearchPage } from "../../Components/HigherOrderComponents/SearchPage";
import { SEARCH_PAGE_TARGET } from "../../Components/HigherOrderComponents/SearchPage/Utils";

export function ResultSearchPage() {
  return (
    <Auxiliary>
      <Text
        translationKey={TRANSLATION_KEY.results_search_page_title}
        textType={TEXT_TYPE.page_title}
      />
      <SearchPage
        searchPageTarget={SEARCH_PAGE_TARGET.VOTE_RESULTS}
      />
    </Auxiliary>
  );
}