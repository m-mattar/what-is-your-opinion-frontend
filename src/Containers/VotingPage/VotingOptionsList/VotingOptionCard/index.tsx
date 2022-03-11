import { VoteOption } from "../../../../Models/VoteOption";
import { useEffect } from "react";

type VotingOptionCardProps = {
  vote: VoteOption,
  onSelection: any,
  isSelected: boolean,
}

export function VotingOptionCard(props: VotingOptionCardProps) {
  let classname = "votingOption " + (props.isSelected ? "isSelected" : "notSelected");

  useEffect(() => {
    console.log("USE EFFECT", props.vote.option, " ", classname)
  })

  return (
    <div className={"card"} onClick={props.onSelection}>
      <header className={"card-header"}>
        <p className={"card-header-title"}>
          {props.vote.option}
        </p>
      </header>
    </div>
  );
}