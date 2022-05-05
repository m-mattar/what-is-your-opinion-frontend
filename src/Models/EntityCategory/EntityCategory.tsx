import "./styles.css"
import { Searchable } from "../../Components/HigherOrderComponents/SearchPage/Searchable";
import { ReactElement } from "react";

export class EntityCategory implements Searchable{
  _id: string = "";
  name: string = "";
  imageName: string = "";

  constructor(_id : string, _entityCategory: string, _imageName: string) {
    this._id = _id
    this.name = _entityCategory
    this.imageName = _imageName
  }

  display(): ReactElement {
    return (
      <div className={"image-content"}>
        <div className={"image"}>
          <img
            src= {this.imageName}
            alt= {this.imageName}
            onClick={this.onClick}
            role={"button"}
          />
        </div>
        <div className="centered">
          {this.name}
        </div>
      </div>
    )
  }

  getTitle(): string {
    return this.name;
  }

  onClick(): void {

  }
}
