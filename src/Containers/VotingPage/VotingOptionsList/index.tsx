import { VoteOption } from "../../../Models/VoteOption";
import { VotingOptionCard } from "./VotingOptionCard";
import {useEffect, useState} from "react";

type VotingOptionsListProps = {
  votingOptions: VoteOption[],
  onChangeSelection: any,
}

export function VotingOptionsList(props: VotingOptionsListProps) {
  const [selectedItem, setSelectedItem] = useState(-1);

  const onItemSelected = (index: number, vote: VoteOption) => {
    props.onChangeSelection(vote);
    return setSelectedItem(index);
  }

  let mappedVotingOptions = props.votingOptions
    .map( (vote, i) => {
      return <VotingOptionCard
        key={vote.id}
        vote={vote}
        onSelection={() => onItemSelected(i, vote)}
        isSelected={selectedItem == i ? true : false}
      />
    }, [])

  return (
    <div>
      { mappedVotingOptions }
    </div>
  );
}