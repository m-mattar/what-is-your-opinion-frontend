import { Searchable } from "../../Components/HigherOrderComponents/SearchPage/Searchable";
import { ReactElement } from "react";

export class EntityCategory implements Searchable{
  _id: string = "";
  name: string = "";
  imageName: string = "";

  display(): ReactElement {
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src= {"./EntityCategoryImages" + this.imageName} alt= {this.imageName}/>
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
