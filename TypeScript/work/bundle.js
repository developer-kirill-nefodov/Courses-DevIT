var __spreadArray = (this && this.__spreadArray) || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
    to[j] = from[i];
  return to;
};

function protect_email(email, r) {
  if (r === void 0) {
    r = '*';
  }
  var a = email.charAt(0), b = String(r + r + r), c = email.indexOf("@"), d = email.indexOf("."),
    e = email.slice(d - 1);
  return "" + (a + b) + email.charAt(c) + (b + e);
}

console.log(protect_email('kirillnef@gmail.com')); //k***@***l.com
function StringChange(value) {
  return (value.split("").map(function (c) {
    return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
  }).sort(function () {
    return Math.random() - 0.5;
  }).join(""));
}

console.log(StringChange('teSTsTRing'));

function text_truncate(str, length, ending) {
  if (length === void 0) {
    length = 100;
  }
  if (ending === void 0) {
    ending = '...';
  }
  var a = str.slice(0, length - ending.length);
  return a.length === str.length ? a : a + ending;
}

console.log(text_truncate('Lorem ipsum dolor sit amet, consectetur adipiscing elit.'));
console.log(text_truncate('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 19));
console.log(text_truncate('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 15, '!!'));

function chunk_str(str, size, trim) {
  if (size === void 0) {
    size = 1;
  }
  if (trim === void 0) {
    trim = true;
  }
  var a = str.split(' ').join('');
  var arr = [];
  console.log(str.substr(4, 7));
  while (a) {
    if (a.length < arr.length) {
      arr.push(a);
      break;
    } else {
      arr.push(a.substr(0, size));
      a = a.substr(size);
    }
  }
  return arr;
}

console.log(chunk_str('con sec tet ur', 3)); //['con', 'sec', 'tet', 'ur']
var arr = [
  [1000, 'M'], [900, 'CM'], [500, 'D'],
  [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'],
  [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
];

function intToRoman(int) {
  if (int === 0) {
    return '';
  }
  for (var i = 0; i < arr.length; i++) {
    if (int >= arr[i][0]) {
      return arr[i][1] + intToRoman(int - arr[i][0]);
    }
  }
}

// console.log(intToRoman(55)) //LV
var permArr = [], usedChars = [], newArr = [];

function permute(input) {
  var arr = input.split('');
  if (arr.indexOf('?') >= 0) {
    var index1 = arr.filter(function (d) {
      return d === '?';
    }).length;
    for (var x = 0; index1 >= x; x++) {
      var idx = arr.indexOf('?') >= 0 ? arr.indexOf('?') : null;
      if (idx !== null) {
        arr[idx] = Math.round(Math.random() * 9);
      }
    }
  }
  var firstEl = arr[0];
  var lastEl = arr[arr.length - 1];
  if (firstEl === '^') {
    newArr[0] = Number(arr[1]);
    arr.splice(0, 2);
    arr.join('').split('');
  }
  if (lastEl === '$') {
    newArr[1] = Number(arr[arr.length - 2]);
    arr.splice(arr.length - 2);
    arr.join('').split('');
  }
  for (var i = 0; i < arr.length; i++) {
    var ch = Number(arr.splice(i, 1)[0]);
    usedChars.push(ch);
    if (arr.length === 0) {
      permArr.push(Number(__spreadArray(__spreadArray([newArr[0]], usedChars), [newArr[1]]).join('')));
    }
    permute(arr.join(''));
    arr.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr;
}

console.log(permute('^6?73?$'));
