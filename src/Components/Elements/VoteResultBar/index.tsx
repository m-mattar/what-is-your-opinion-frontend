import * as React from "react";
import { useEffect } from "react";
import "./style.css"
import { TRANSLATION_KEY } from "../../../Translations/TranslationUtils";
import { translationProvider } from "../../../Translations/TranslationProvider";

type VoteResultBarProps = {
  id: string,
  positivePercentage: number,
}

export function VoteResultBar(props: VoteResultBarProps) {
  useEffect(() => {
    let elementId = "poll-result-display-"+ props.id;
    let percentLeft = props.positivePercentage.toString();
    let percentRight = (100 - props.positivePercentage).toString();
    //TODO: find a way to do it without tsIgnore
    // @ts-ignore
    document.getElementById(elementId).style.gridTemplateColumns=  percentLeft + "% " + percentRight + "%";
  })

  return (
    <div className={`container-poll`} id={"poll-result-display-"+props.id}>
      <div className="left" >
        <div className="text">
          <br/>
          <span className="option-title-left" id="option-one">
            {translationProvider.getTranslation(TRANSLATION_KEY.voting_results_bar_left_side_title)}
          </span>
        </div>
      </div>
      <div className="right" >
        <div className="text">
          <br/>
          <span className="option-title-right" id="option-two">
            {translationProvider.getTranslation(TRANSLATION_KEY.voting_results_bar_right_side_title)}
          </span>
        </div>
      </div>
    </div>
  );
}