import * as React from "react";
import { TRANSLATION_KEY } from "../../../Translations/TranslationUtils";
import { translationProvider } from "../../../Translations/TranslationProvider";
import { ChangeEvent } from "react";

type DropdownProps = {
  items: string[],
  translationKey: TRANSLATION_KEY,
  onSelect: any,
}

export function Dropdown(props: DropdownProps) {
  let dropdownItems = props.items
    .map( (item, i) => {
      if(i === 0) {
        item = translationProvider.getTranslation(props.translationKey)
      }
      return (
        <option key={"dropdownItem-"+i}>
          {item}
        </option>
      );
    }, []);

  const changeLocation = (e: ChangeEvent<HTMLSelectElement>) => {
    props.onSelect(e.target.value);
  }

  return (
    <div className="select is-rounded is-expanded">
      <select onChange={(e) => changeLocation(e)}>
        {dropdownItems}
      </select>
    </div>
  );
}