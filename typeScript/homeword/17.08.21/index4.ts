function chunk_str(str: string, size: number = 1): any {
    let a = str.split(' ').join('')
    let arr: Array<string> = []

    while (a) {
        if (a.length < arr.length) {
            arr.push(a);
            break
        }
        else {
            arr.push(a.substr(0, size));
            a = a.substr(size);
        }
    }
    return arr;
}

console.log(chunk_str('con sec tet ur', 3)) //['con', 'sec', 'tet', 'ur']