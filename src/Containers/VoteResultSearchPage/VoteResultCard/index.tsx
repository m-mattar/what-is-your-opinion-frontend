import React from "react";
import { VoteResult } from "../../../Models/VoteResult";
import "./styles.css"

type VoteResultCardProps = {
    result: VoteResult,
}

export function VoteResultCard(props: VoteResultCardProps) {
  return (
    <div className={"card"}>
      <div className={"container mt-1 mx-2 pb-1"}>
        <div className={"typography has-text-centered"}> {props.result.entity} </div>
        {/*TODO: Add Icon to the right of the progress bar when converting it to a clickable*/}
        <div className={"progress-wrapper"}>
          <progress
            className={"progress is-large is-success"}
            value={props.result.positivePercentage}
            max="100"
          ></progress>
          <p className={"progress-value has-text-black"}>{props.result.positivePercentage}%</p>
        </div>
      </div>
    </div>
  );
}