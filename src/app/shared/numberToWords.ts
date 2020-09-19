import converter from 'number-to-words';
import capitalize from 'capitalize';

export function numberToWords(number: any) {
  const myNumber: number = +number;
  const numToWords = converter.toWords(myNumber).replace(',', '').replace('-', ' ').split(' ');
  const arr = new Array();
  numToWords.forEach((curNum: any) => {
    arr.push(capitalize(curNum));
  });
  return arr.join(' ');
}
