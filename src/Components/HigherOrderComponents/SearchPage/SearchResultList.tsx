import { VoteResult } from "../../../Models/VoteResult";
import { SEARCH_PAGE_TARGET } from "./Utils";
import { SearchResultCard } from "./SearchResultCard";
import { Entity } from "../../../Models/Entity";

type SearchResultListProps = {
  results: VoteResult[] | Entity[],
  searchPageTarget: SEARCH_PAGE_TARGET,
}

export function SearchResultList(props: SearchResultListProps) {
  let mappedResults = props.results
    .map( (currentResult, i) => {
      return <SearchResultCard
        key={"result-card-"+i}
        result={currentResult}
        searchPageTarget={props.searchPageTarget}
      />
    }, [])

  return (
    <div className={"box"}>
      { mappedResults }
    </div>
  );
}