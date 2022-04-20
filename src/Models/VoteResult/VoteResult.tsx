/*export type VoteResult = {
  id: string,
  entity: string,
  positivePercentage: number,
};*/

import "./styles.css"
import { Searchable } from "../../Components/HigherOrderComponents/SearchPage/Searchable";
import React, { ReactElement } from "react";

export class VoteResult implements Searchable{
  id: string = "";
  entity: string = "";
  result: number[] = [0, 0];
  positivePercentage: number = 0;

  constructor(_id : string, _entity: string, _result: number[], _positivePercentage: number) {
    this.id = _id
    this.entity = _entity
    this.result = _result
    this.positivePercentage = _positivePercentage
  }

  display(): ReactElement {
    return (
      <div className={"card"}>
        <div className={"container mt-1 mx-2 pb-1"}>
          <div className={"typography has-text-centered"}> {this.entity} </div>
          {/*TODO: Add Icon to the right of the progress bar when converting it to a clickable*/}
          <div className={"progress-wrapper"}>
            <progress
              className={"progress is-large is-success"}
              value={this.positivePercentage}
              max="100"
            />
            <p className={"progress-value has-text-black"}>{this.positivePercentage}%</p>
          </div>
        </div>
      </div>
    );
  }

  getTitle(): string {
    return this.entity;
  }

  onClick(): void {
  }

}

