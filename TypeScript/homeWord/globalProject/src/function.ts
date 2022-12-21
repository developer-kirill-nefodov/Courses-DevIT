export function random_ID(): string {
  let id = String.fromCharCode(Math.floor((Math.random() * 25) + 65));

  do {
    let code = Math.floor((Math.random() * 42) + 48);

    if (code < 58 || code > 64) {
      id += String.fromCharCode(code);
    }
  } while (id.length < 10);

  return id;
}

export function help(): string {
  return (
    ' * .run((1 - params), (2 - params), (3 - params), (4 - params), (5 - params), (6 - params), (7 - params))\n' +
    ' *\n' +
    ' * 1:string - (help | get | create | add | update | delete | order)\n' +
    ' *\n' +
    ' *    help:\n' +
    ' *\n' +
    ' *    get: {\n' +
    ' *        2:sting - (workers | menu);\n' +
    ' *        3:string - (nameShop);\n' +
    ' *    }\n' +
    ' *    create: {\n' +
    ' *        2:string - (cafe);\n' +
    ' *        3:string - (address);\n' +
    ' *        4:string - (title)\n' +
    ' *    }\n' +
    ' *    add: {\n' +
    ' *        2:string - (staff | menu)\n' +
    ' *        3:object - ({\n' +
    ' *        type:string,\n' +
    ' *        name:string,\n' +
    ' *        price:number,\n' +
    ' *        calories:number,\n' +
    ' *        additive:array[{\n' +
    ' *        name:string,\n' +
    ' *        price:number,\n' +
    ' *        calories:number}]\n' +
    ' *        })\n' +
    ' *    }\n' +
    ' *    update: {\n' +
    ' *        2:string - (id:string = idPerson | idMenu)\n' +
    ' *        3:object - ({data})\n' +
    ' *        4:string - (nameShop)\n' +
    ' *    }\n' +
    ' *    delete: {\n' +
    ' *        2:string - (id:string = idPerson | idMenu)\n' +
    ' *        3:string - (nameShop)\n' +
    ' *    }\n' +
    ' *    order: {\n' +
    ' *        2:string - (nameShop);\n' +
    ' *        3:string - (food|drink);\n' +
    ' *        4:string - (name);\n' +
    ' *        5:number - (number); | default - 1\n' +
    ' *        6:string - (additive) | default - null\n' +
    ' *        7:string - (close) | default - null\n' +
    ' *    }'
  )
}
