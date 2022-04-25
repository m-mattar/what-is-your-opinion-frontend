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
    if(selectedItem === index) {
      return setSelectedItem(-1)
    }
    return setSelectedItem(index);
  }

  let mappedVotingOptions = props.votingOptions
    .map( (vote, i) => {
      return <VotingOptionCard
        key={vote.id}
        vote={vote}
        color={i}
        onSelection={() => onItemSelected(i, vote)}
        isSelected={selectedItem === i}
      />
    }, [])

  return (
    <div className={"columns is-multiline"}>
        { mappedVotingOptions }
    </div>
  );
}