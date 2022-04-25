import { SEARCH_PAGE_TARGET } from "./Utils";
import { DISPLAY_TYPE, Searchable } from "./Searchable";

type SearchResultListProps = {
  results: Searchable[],
  searchPageTarget: SEARCH_PAGE_TARGET,
  displayType: DISPLAY_TYPE,
}

export function SearchResultList(props: SearchResultListProps) {
  let mappedResults = props.results
    .map( (currentResult, i) => {
      return (
        <div key={"search-result-list-card-"+i}>
          {currentResult.display()}
        </div>
      );
    }, [])
  if(props.displayType == DISPLAY_TYPE.SINGLE_COLUMN){
    return (
      <div>
        {mappedResults}
      </div>
    )
  }

  let n = mappedResults.length
  return (
    <div className="columns is-centered">
      <div className="column">
        {mappedResults.slice(0, (n + 1) / 2)}
      </div>
      <div className="column">
        {mappedResults.slice((n + 1) / 2)}
      </div>
    </div>
  );
}