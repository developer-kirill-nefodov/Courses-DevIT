function hack(obj: object): string | object {
  if (!Object.isFrozen(obj)) return obj;

  return JSON.parse(JSON.stringify(obj));
}

const user = {
  name: 'personX',
  age: 5000
};

Object.freeze(user);

console.log(hack(user))
