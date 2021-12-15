import {Board} from "./board";

export class BoardList {
  search_option : string;
  search_word : string;
  order : string;
  column : string;
  offset : number;
  limit : number;
  total : number;
  board : Board[]
}
