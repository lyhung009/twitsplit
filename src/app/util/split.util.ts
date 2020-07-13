import {MESSAGE_LENGTH} from "../constants";

export function splitText(text: string): string[] {
  text = text.replace(/\r?\n|\r/g, ' ').replace(/  +/g, ' ');

  if (text.length <= MESSAGE_LENGTH) {
    return [text];
  }

  const total: number = Math.ceil(text.length / MESSAGE_LENGTH);
  const words: string[] = text.split(' ');

  for (let i = 0; i < words.length; i++) {
    if (words[i].length > MESSAGE_LENGTH) throw new Error("Word length is more than " + MESSAGE_LENGTH + ' characters');
  }


  return getIndicatorParts(words, total);
}

function getIndicatorParts(words: string[], total: number): string[] {
  const result: string[] = [];
  let index = 1;
  let start = index + '/' + total;
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if ((start + ' ' + word).length <= MESSAGE_LENGTH) {
      start += ' ' + word;
    } else {
      i--;
      result.push(start);
      start = (++index) + '/' + total;

      if ((start + ' ' + word).length > MESSAGE_LENGTH) {
        throw new Error('Cannot construct a indicator part with word ' + word);
      }
    }

    if (i == words.length - 1) {
      result.push(start);
    }

    if (index > total) break;
  }

  if (index > total) return getIndicatorParts(words, total + 1);
  return result;
}
