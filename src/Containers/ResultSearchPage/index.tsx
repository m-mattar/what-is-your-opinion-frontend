import React, { useEffect, useState } from "react";
import Auxiliary from "../../Components/HigherOrderComponents/Auxiliary";
import { Result } from "../../Models/Result";
import { resultService } from "../../Services/ResultService";
import { ResultList } from "./ResultList";
import { SearchBar } from "./SearchBar";
import { Text, TEXT_TYPE } from "../../Components/Elements/Text";
import { TRANSLATION_KEYS } from "../../Translations/TranslationUtils";

export function ResultSearchPage() {
  const [searchInput, setSearchInput] = useState('' as string);
  const [resultListDefault, setResultListDefault] = useState([] as Result[]);
  const [resultList, setResultList] = useState([] as Result[]);

  const fetchInitialData = () => {
    let initialResults: Result[] = resultService.getInitialSearchPageResults();
    setResultListDefault(initialResults);
    setResultList(initialResults);
  }

  const filterResultList = (input: string) => {
    const filtered = resultListDefault.filter(result => {
      return result.entity.toLowerCase().includes(input.toLowerCase())
    })
    setSearchInput(input);
    setResultList(filtered);
  }

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <Auxiliary>
      <Text
        translationKey={TRANSLATION_KEYS.results_search_page_title}
        textType={TEXT_TYPE.page_title}
      />
      <SearchBar
        keyword={searchInput}
        setKeyword={filterResultList}
      />
      <ResultList results={resultList}/>
    </Auxiliary>
  );
}