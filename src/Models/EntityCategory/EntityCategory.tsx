import { Searchable } from "../../Components/HigherOrderComponents/SearchPage/Searchable";
import { ReactElement } from "react";

export class EntityCategory implements Searchable{
  _id: string = "";
  name: string = "";
  imageName: string = "";

  constructor(_id : string, _entity: string, _imageName: string) {
    this._id = _id
    this.name = _entity
    this.imageName = _imageName
  }

  display(): ReactElement {
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image is-square">
            <img src= {"./EntityCategoryImages/" + this.imageName} alt= {this.imageName}/>
          </figure>
        </div>
      </div>
    )
  }

  getTitle(): string {
    return "";
  }

  onClick(): void {
  }
}
