import * as React from "react";

type BaseButtonProps = {
  classname: string,
  onClick: any,
  title: string,
  isEnabled: boolean,
  _id: string,
}

export function Button(props: BaseButtonProps) {
  return (
    <button id={props._id}
      className={props.classname}
      onClick={props.onClick}
      disabled={!props.isEnabled}
    > {props.title} </button>
  );
}