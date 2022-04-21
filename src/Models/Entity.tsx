import { Searchable } from "../Components/HigherOrderComponents/SearchPage/Searchable";
import { ReactElement } from "react";

export class Entity implements Searchable{
  _id: string = "";
  name: string = "";

  display(): ReactElement {
    return (<div> Hello </div>)
  }

  getTitle(): string {
    return "";
  }

  onClick(): void {
  }
}
