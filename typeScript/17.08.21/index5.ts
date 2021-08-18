const arr: Array<[number, string]> = [
    [1000, 'M'], [900, 'CM'], [500, 'D'],
    [400, 'CD'], [100, 'C'], [90, 'XC'],
    [50, 'L'], [40, 'XL'], [10, 'X'],
    [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
];

function intToRoman(int: number): string {
    if (int === 0) {
        return '';
    }
    for (let i = 0; i < arr.length; i++) {
        if (int >= arr[i][0]) {
            return arr[i][1] + intToRoman(int - arr[i][0]);
        }
    }
}

// console.log(intToRoman(55)) //LV