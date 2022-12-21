const arr = [
  [1000, 'M'], [900, 'CM'], [500, 'D'],
  [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'],
  [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
];

function intToRoman(int) {
  if (int === 0) {
    return '';
  }
  for (let i = 0; i < arr.length; i++) {
    if (int >= arr[i][0]) {
      return arr[i][1] + intToRoman(int - arr[i][0]);
    }
  }
}

// console.log(intToRoman(55)) //LV

const lookup = {
  M: 1000, CM: 900, D: 500,
  CD: 400, C: 100, XC: 90,
  L: 50, XL: 40, X: 10,
  IX: 9, V: 5, IV: 4, I: 1
}

function convertToRoman(num) {
  let roman = ''

  for (let i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}

// console.log(convertToRoman(3644));
