import React, { ReactElement } from "react";
import { VoteResultCard } from "../../../Containers/VoteResultSearchPage/VoteResultCard";
import { SEARCH_PAGE_TARGET } from "./Utils";

type SearchResultCardProps = {
  result: any,
  searchPageTarget: SEARCH_PAGE_TARGET,
}

//TODO: convert this to an interface
export function SearchResultCard(props: SearchResultCardProps): ReactElement {
  switch (props.searchPageTarget) {
    case SEARCH_PAGE_TARGET.VOTE_RESULTS: {
      return <VoteResultCard key={props.result.id} result={props.result}/>
    }
    case SEARCH_PAGE_TARGET.ENTITIES: {
      return <div>Hello</div>;
    }
    default: {
      return <div>Hello</div>;
    }
  }
}