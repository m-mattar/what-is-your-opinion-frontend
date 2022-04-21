import { ReactElement } from "react";

export interface Searchable{
  _id: string;
  getTitle(): string;
  display(): ReactElement;
  onClick(): void;
}