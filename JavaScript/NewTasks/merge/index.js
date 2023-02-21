const intervalArr = [
  [1, 3], [2, 6], [4, 6],
  [7, 9], [8, 10], [15, 18],
  [11, 15], [19, 20]
]
function merge(interval) {
  if(interval.length < 2) {
    return interval;
  }
  interval.sort((a, b) => a[0] - b[0]);

  const result = [interval[0]];

  for(let i = 1; i < interval.length; i++) {
    const last = result[result.length - 1];
    const current = interval[i];

    if(last[1] >= current[0]) {
      result[result.length - 1] = [last[0], current[1]];
    } else {
      result.push(current);
    }
  }

  return result;
}

console.log(merge(intervalArr))
