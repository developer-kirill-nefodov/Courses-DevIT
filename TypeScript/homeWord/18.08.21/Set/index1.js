function SetUn(one, two) {
  let newSet = new Set(one);

  for (let elem of two) {
    newSet.delete(elem);
  }

  return newSet;
}


let a = new Set([1, 2, 3, 4, 5]);
let b = new Set([3, 4, 5, 6, 7]);

// console.log(SetUn(a, b))

/** test2 **/
function dbSet(one, two) {
  let union = new Set(one);
  for (let elem of two) {
    union.add(elem);
  }
  return union;
}

// console.log(dbSet(a, b))

/** test-3 **/

function isSet(one, two) {

  for (let elem of two) {
    if (!one.has(elem)) {
      return false;
    }
  }

  return true;
}

// console.log(isSet(a, b))
