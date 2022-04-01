import * as React from "react";

type BaseButtonProps = {
    classname: string,
    onClick: any,
    title: string,
    isEnabled: boolean,
}

export function BaseButton(props: BaseButtonProps) {
  return (
    <button
      className={props.classname}
      onClick={props.onClick}
    > {props.title} </button>
  );
}