function chunk_str(str: string, size: number = 1, trim: boolean = true): any {
    let a = str.split(' ').join('')
    let arr: Array<string> = []
    console.log(str.substr(4, 7))
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
    return arr
}

// console.log(chunk_str('con sectetur', 3)) //['con', 'sec', 'tet', 'ur']