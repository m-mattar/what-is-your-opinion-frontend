import React, { useEffect, useState } from "react";
import { Result } from "../../../Models/Result";
import { resultService } from "../../../Services/ResultService";
import { Text, TEXT_TYPE } from "../../Elements/Text";
import { SEARCH_PAGE_TARGET, searchPageTargetToTranslationKey } from "./Utils";
import Auxiliary from "../Auxiliary";
import { SearchBar } from "../../Elements/SearchBar";
import { ResultList } from "../../../Containers/ResultSearchPage/ResultList";

type SearchPageProps = {
  searchPageTarget: SEARCH_PAGE_TARGET,
}

export function SearchPage(props: SearchPageProps) {
  const [searchInput, setSearchInput] = useState('' as string);
  const [searchResultListDefault, setSearchResultListDefault] = useState([] as Result[]);
  const [searchResultList, setSearchResultList] = useState([] as Result[]);

  const fetchInitialData = () => {
    let initialResults: Result[] = resultService.getInitialSearchPageResults();
    setSearchResultListDefault(initialResults);
    setSearchResultList(initialResults);
  }

  const filterResultList = (input: string) => {
    const filtered = searchResultListDefault.filter(result => {
      return result.entity.toLowerCase().includes(input.toLowerCase())
    })
    setSearchInput(input);
    setSearchResultList(filtered);
  }

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <Auxiliary>
      <Text
        translationKey={searchPageTargetToTranslationKey.get!(props.searchPageTarget)!}
        textType={TEXT_TYPE.page_title}>
      </Text>

      <SearchBar
        keyword={searchInput}
        setKeyword={filterResultList}
      />
      <ResultList results={searchResultList}/>
    </Auxiliary>
  );
}