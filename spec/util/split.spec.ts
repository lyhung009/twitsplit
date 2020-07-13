import 'jasmine';
import {splitText} from "../../src/app/util/split.util";
import {data} from "./data";
import {MESSAGE_LENGTH} from "../../src/app/constants";

describe('Split text', function () {
  it('Split text to correct blocks', function () {
    let result: string[] = splitText(data);
    expect(result.length).toBe(31);

    let index = result.findIndex(item => item.length > MESSAGE_LENGTH);
    expect(index).toBeLessThan(0);
  });
});
