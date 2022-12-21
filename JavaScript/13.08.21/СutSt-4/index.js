function chunk_str(str, size = 1, trim = true) {
  let a = str.split(' ').join('')
  let arr = []
  console.log(str.substr(4, 7))
  while (a) {
    if (a.length < arr) {
      arr.push(a);
      break
    } else {
      arr.push(a.substr(0, size));
      a = a.substr(size);
    }
  }
  return arr
}

// console.log(chunk_str('con sectetur', 3)) //['con', 'sec', 'tet', 'ur']
