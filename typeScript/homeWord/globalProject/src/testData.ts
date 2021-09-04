import {person1, person2, person3} from "./Person.js";
import {drink1, drink2, drink3, food1, food2, food3} from "./Menu.js";
import ShopGrid from "./ShopGrid.js";

const shopGrid = new ShopGrid()

/**
 * .run((1 - params), (2 - params), (3 - params), (4 - params), (5 - params), (6 - params), (7 - params))
 *
 * 1:string - (help | get | create | add | update | delete | order)
 *
 *    help:
 *
 *    get: {
 *        2:sting - (workers | menu);
 *        3:string - (nameShop);
 *    }
 *    create: {
 *        2:string - (cafe);
 *        3:string - (address);
 *        4:string - (title)
 *    }
 *    add: {
 *        2:string - (staff | menu)
 *        3:object - ({
 *        type:string,
 *        name:string,
 *        price:number,
 *        calories:number,
 *        additive:array[{
 *        name:string,
 *        price:number,
 *        calories:number}]
 *        })
 *    }
 *    update: {
 *        2:string - (id:string = idPerson | idMenu)
 *        3:object - ({data})
 *        4:string - (nameShop)
 *    }
 *    delete: {
 *        2:string - (id:string = idPerson | idMenu)
 *        3:string - (nameShop)
 *    }
 *    order: {
 *        2:string - (nameShop);
 *        3:string - (food|drink);
 *        4:string - (name);
 *        5:number - (number); | default - 1
 *        6:string - (additive) | default - null
 *        7:string - (close) | default - null
 *    }
 */

// console.log(shopGrid.run('help'));

// console.log(shopGrid.run('create', 'cafe', 'Новгороськая улица, 5-7', 'Кебаб Хаус'));
//
// console.log(shopGrid.run('ADD', 'staff', person1, 'Кебаб Хаус'));
// console.log(shopGrid.run('ADD', 'staff', person2, 'Кебаб Хаус'));
// console.log(shopGrid.run('ADD', 'staff', person3, 'Кебаб Хаус'));
//
// console.log(shopGrid.run('ADD', 'menu', drink1, 'Кебаб Хаус'));
// console.log(shopGrid.run('ADD', 'menu', drink2, 'Кебаб Хаус'));
// console.log(shopGrid.run('ADD', 'menu', drink3, 'Кебаб Хаус'));
//
// console.log(shopGrid.run('ADD', 'menu', food1, 'Кебаб Хаус'));
// console.log(shopGrid.run('ADD', 'menu', food2, 'Кебаб Хаус'));
// console.log(shopGrid.run('ADD', 'menu', food3, 'Кебаб Хаус'));
//
// console.log(shopGrid.run('get', 'menu', 'Кебаб Хаус'));
// console.log(shopGrid.run('get', 'workers', 'Кебаб Хаус'));
//
// console.log(shopGrid.run('order', 'Кебаб Хаус', 'food', 'Pizza', 4))
// console.log(shopGrid.run('order', 'Кебаб Хаус', 'food', 'Pizza', 4))
// console.log(shopGrid.run('order', 'Кебаб Хаус', 'food', 'Pizza', 4, 'cheese'))
// console.log(shopGrid.run('order', 'Кебаб Хаус', 'food', 'Pizza', 10, 'cheese'))
// console.log(shopGrid.run('order', 'Кебаб Хаус', 'drink', 'Water'))
// console.log(shopGrid.run('order', 'Кебаб Хаус', 'drink', 'Water', 10, 'milk'))
// console.log(shopGrid.run('order', 'Кебаб Хаус', 'drink', 'Water', 10, 'null', 'close'))