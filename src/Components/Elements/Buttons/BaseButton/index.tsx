import * as React from "react";

type BaseButtonProps = {
    onClick: any,
    title: string,
    isEnabled: boolean,
}

export function BaseButton(props: BaseButtonProps) {
  return (
    <button
      className={"button is-medium is-light is-responsive"}
      onClick={props.onClick}
    > {props.title} </button>
  );
}