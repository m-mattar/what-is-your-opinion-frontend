import { VoteOption } from "../../../../Models/VoteOption";
import { useEffect, useState } from "react";
import "./style.css"

type VotingOptionCardProps = {
  vote: VoteOption,
  color: number,
  onSelection: any,
  isSelected: boolean,
}

export function VotingOptionCard(props: VotingOptionCardProps) {
  const [classnameSelection, setClassnameSelection] = useState( "" as string);

  useEffect(() => {
    let isSelected = (props.isSelected ? "selected-card" : "");
    setClassnameSelection(isSelected)
  })

  return (
    <div className={"column is-half"}>
      <div className={"selectable-card color-"+ props.color + " " + classnameSelection} onClick={props.onSelection}>
        <header className={"card-header"}>
          <span className={"card-header-title header-color"}>
            {props.vote.option}
          </span>
        </header>
      </div>
    </div>
  );
}