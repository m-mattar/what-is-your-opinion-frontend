import React from "react";
import { Result } from "../../../Models/Result";
import "./style.css";

type ResultCardProps = {
    result: Result,
}

export function ResultCard(props: ResultCardProps) {
  return (
    <div className={"cardContainer"}>
      <div>
        <p> {props.result.entity}: {props.result.positivePercentage}% </p>
      </div>
    </div>
  );
}