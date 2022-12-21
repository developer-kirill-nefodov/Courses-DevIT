/** Test-1 **/
function stringChange(value) {
  return value.replace(/([a-z]+)|([A-Z]+)/g, function (_, low, up) {
    return low ? low.toUpperCase() : up.toLowerCase()
  })
}

//console.log(stringChange('teSTsTRing'))

/** Test-2 **/
function stringCheck(value) {
  return typeof value === "string"
}

// console.log(stringCheck("string")) //true
// console.log(stringCheck(1)) //false

/** Test-3 **/
function string(name, surname) {
  return `${name} ${surname.slice(0, 1)}.`
}

console.log(string('John', 'Dou'));

// function StringChange (value) {
//    return  value.split("")
//         .map(c => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
//         .join("");
// }
