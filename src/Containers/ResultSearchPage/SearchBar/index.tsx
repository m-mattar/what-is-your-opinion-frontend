import "./style.css"
import { ChangeEvent } from "react";

type SearchBarProps = {
    keyword: string,
    setKeyword: any, //placeholder, need it to be a function
}

export function SearchBar(props: SearchBarProps) {
  return (
    <form>
      <input
        className={"searchBar"}
        id={"result-search-bar"}
        value={props.keyword}
        name={"entity"}
        placeholder={"Search for completed polls"}
        onChange={
          (changedKeyword: ChangeEvent<HTMLInputElement>) => {
            props.setKeyword(changedKeyword.target.value);
          }
        }
      />
    </form>
  );
}
