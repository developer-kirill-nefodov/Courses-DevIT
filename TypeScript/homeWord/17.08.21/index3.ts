function text_truncate(str: string, length: number = 100, ending: string = '...'): string {
  let a = str.slice(0, length - ending.length)

  return a.length === str.length ? a : a + ending
}

console.log(text_truncate('Lorem ipsum dolor sit amet, consectetur adipiscing elit.'))
console.log(text_truncate('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 19))
console.log(text_truncate('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 15, '!!'))
