import { SEARCH_PAGE_TARGET } from "./Utils";
import { Searchable } from "./Searchable";

type SearchResultListProps = {
  results: Searchable[],
  searchPageTarget: SEARCH_PAGE_TARGET,
}

export function SearchResultList(props: SearchResultListProps) {
  let mappedResults = props.results
    .map( (currentResult, i) => {
      return currentResult.display()
    }, [])

  return (
    <div className={"box"}>
      { mappedResults }
    </div>
  );
}