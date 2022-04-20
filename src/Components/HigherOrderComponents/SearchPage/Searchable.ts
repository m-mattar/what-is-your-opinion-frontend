import { ReactElement } from "react";

export interface Searchable{
  id: string;
  getTitle(): string;
  display(): ReactElement;
  onClick(): void;
}