import React, { useEffect, useState } from "react";
import Auxiliary from "../../HigherOrderComponents/Auxiliary";
import { Result } from "../../Models/Result";
import { resultService } from "../../Services/ResultService";
import { ResultList } from "./ResultList";
import { SearchBar } from "./SearchBar";

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
      <div>RESULT SEARCH PAGE</div>
      <SearchBar
        keyword={searchInput}
        setKeyword={filterResultList}
      />
      <ResultList results={resultList}/>
    </Auxiliary>
  );
}