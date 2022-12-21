let permArr = [], usedChars = [], newArr = [];

function permute(input) {
  let arr = input.split('');

  if (arr.indexOf('?') >= 0) {
    let index1 = arr.filter(d => d === '?').length;

    for (let x = 0; index1 >= x; x++) {
      let idx = arr.indexOf('?') >= 0 ? arr.indexOf('?') : null;

      if (idx !== null) {
        arr[idx] = Math.round(Math.random() * 9);
      }
    }
  }

  let firstEl = arr[0];
  let lastEl = arr[arr.length - 1];

  if (firstEl === '^') {
    newArr[0] = arr[1];
    arr.splice(0, 2);
    arr.join('').split('');
  }

  if (lastEl === '$') {
    newArr[1] = arr[arr.length - 2];
    arr.splice(arr.length - 2);
    arr.join('').split('');
  }

  for (let i = 0; i < arr.length; i++) {
    let ch = arr.splice(i, 1)[0];
    usedChars.push(ch);
    if (arr.length === 0) {
      permArr.push([newArr[0], ...usedChars, newArr[1]].join(''));
    }
    permute(arr.join(''));
    arr.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr;
}

console.log(permute('^6?73?$'));
