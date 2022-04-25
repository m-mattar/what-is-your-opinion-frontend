import { ReactElement } from "react";

export enum DISPLAY_TYPE {
  SINGLE_COLUMN,
  DOUBLE_COLUMNS
}

export interface Searchable{
  _id: string;
  getTitle(): string;
  display(): ReactElement;
  onClick(): void;
}