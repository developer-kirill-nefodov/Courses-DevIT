const generator = {
    myGen(n = 1) {
        let i = 0;

        return {
            next() {
                if (i < n) {
                    return {value: ++i, done: false}
                }
                return {value: undefined, done: true}
            }
        }
    }
}

console.log(generator.myGen().next())
console.log(generator.myGen().next())