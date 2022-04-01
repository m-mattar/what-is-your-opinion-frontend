import React, { useEffect, useState } from "react";
import { VoteResult } from "../../../Models/VoteResult";
import { Text, TEXT_TYPE } from "../../Elements/Text";
import { SEARCH_PAGE_TARGET, searchPageTargetToTranslationKey } from "./Utils";
import Auxiliary from "../Auxiliary";
import { SearchBar } from "../../Elements/SearchBar";
import { SearchResultList } from "./SearchResultList";

type SearchPageProps = {
  searchPageTarget: SEARCH_PAGE_TARGET,
  initialResults: any, //has to be an array
}

export function SearchPage(props: SearchPageProps) {
  const [searchInput, setSearchInput] = useState('' as string);
  const [searchResultListDefault, setSearchResultListDefault] = useState([] as VoteResult[]);
  const [searchResultList, setSearchResultList] = useState([] as VoteResult[]);

  const filterResultList = (input: string) => {
    const filtered = searchResultListDefault.filter(result => {
      return result.entity.toLowerCase().includes(input.toLowerCase())
    })
    setSearchInput(input);
    setSearchResultList(filtered);
  }

  useEffect(() => {
    //TODO: CONVERT TO REDUX
    setSearchResultListDefault(props.initialResults);
    setSearchResultList(props.initialResults);
  }, []);

  return (
    <Auxiliary>
      <Text
        translationKey={searchPageTargetToTranslationKey.get!(props.searchPageTarget)!}
        textType={TEXT_TYPE.page_title}
      />

      <SearchBar
        keyword={searchInput}
        setKeyword={filterResultList}
      />
      <SearchResultList results={searchResultList} searchPageTarget={props.searchPageTarget}/>
    </Auxiliary>
  );
}