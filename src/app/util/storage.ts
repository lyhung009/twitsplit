import {TextBlock} from "../model/TextBlock";

export function saveBlock(blocks: TextBlock[]) {
  localStorage.setItem('text-blocks', JSON.stringify(blocks));
}

export function getBlocks(): TextBlock[] {
  return JSON.parse(localStorage.getItem('text-blocks'));
}
