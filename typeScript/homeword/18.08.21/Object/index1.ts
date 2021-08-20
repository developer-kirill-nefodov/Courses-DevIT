function obj_dbArr(obj: object): object{
    return Object.entries(obj)
}

const newObj = {
    name: 'Bob',
    age: 25
};

console.log(obj_dbArr(newObj))