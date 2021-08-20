function arrToObj(arr: object): object{
    let newArr = {}
    arr.map((n) => Object.assign(newArr, n));

    return newArr
}
const arr = [{ a: 1 }, { b: 2, c: 3 }];
console.log(arrToObj(arr));