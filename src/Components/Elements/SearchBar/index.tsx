import { ChangeEvent } from "react";
import { TRANSLATION_KEY } from "../../../Translations/TranslationUtils";
import { translationProvider } from "../../../Translations/TranslationProvider";

type SearchBarProps = {
    keyword: string,
    setKeyword: any,
}

export function SearchBar(props: SearchBarProps) {
  return (
    <div className={"field"}>
      <p className="control has-icons-left">
        <input
            className={"input"}
            type={"text"}
            id={"result-search-bar"}
            value={props.keyword}
            name={"entity"}
            placeholder={translationProvider.getTranslation(TRANSLATION_KEY.results_search_bar)}
            onChange={
              (changedKeyword: ChangeEvent<HTMLInputElement>) => {
                props.setKeyword(changedKeyword.target.value);
              }
            }
        />
        <span className={"icon is-small is-left"}>
          <i className={"fa-regular fa-magnifying-glass"}></i>
        </span>
      </p>
    </div>
  );
}
