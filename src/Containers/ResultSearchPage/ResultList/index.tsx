import { Result } from "../../../Models/Result";
import { ResultCard } from "./ResultCard";

type resultListProps = {
    results: Result[],
}

export function ResultList(props: resultListProps) {
  let mappedResults = props.results
    .map( currentResult => {
      return <ResultCard key={currentResult.id} result={currentResult}/>
    }, [])

  return (
    <div className={"box"}>
     { mappedResults }
    </div>
  );
}