import "./styles.css"
import { Searchable } from "../../Components/HigherOrderComponents/SearchPage/Searchable";
import React, { ReactElement } from "react";
import { VoteResultBar } from "../../Components/Elements/VoteResultBar";

export class VoteResult implements Searchable{
  _id: string = "";
  entity: string = "";
  result: number[] = [0, 0];
  positivePercentage: number = 0;

  constructor(_id : string, _entity: string, _result: number[], _positivePercentage: number) {
    this._id = _id
    this.entity = _entity
    this.result = _result
    this.positivePercentage = _positivePercentage
  }

  display(): ReactElement {
    return (
      <div className={"card-boxed mt-5"}>
        <div className={"container mt-5 mx-2 pb-2"}>
          <div className={"typography has-text-right mx-3 pb-2"}> {this.entity} </div>
          <VoteResultBar
           id={this._id}
           positivePercentage={this.positivePercentage}
          />
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

