import React from "react";
import { Result } from "../../../../Models/Result";

type ResultCardProps = {
    result: Result,
}

export function ResultCard(props: ResultCardProps) {
  return (
    <div className={"card"}>
      <div>
        <p> {props.result.entity}: {props.result.positivePercentage}% </p>
        <progress
          className={"progress is-large is-success"}
          value={props.result.positivePercentage}
          max="100">{props.result.positivePercentage}%</progress>
      </div>
    </div>
  );
}