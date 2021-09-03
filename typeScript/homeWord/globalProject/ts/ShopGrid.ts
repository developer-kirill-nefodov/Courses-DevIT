import FastFood from "./FastFood.js";
import {person1, person2, person3, person4} from "./Person.js";
import {food1, food2, food3, drink1, drink2, drink3} from "./Menu.js";

class ShopGrid {
    private shopGrid: object = {
        shop: {}
    }

    /** */
    public run(one: string, what: string = null, ...others: any[]): string | Array<any> | void {

        if (one.toLocaleLowerCase() === 'help') {
            return `document commands...`
        }

        if (one.toLocaleLowerCase() === 'create') {
            switch (what.toLocaleLowerCase()) {
                case('cafe'): {
                    this.shopGrid['shop'][others[1]] = new FastFood(others[0], others[1]);
                    return `cafe with the name ${others[1]} created`
                }
            }
        }

        if (one.toLocaleLowerCase() === 'add') {
            if (what.toLocaleLowerCase() === 'staff') {
                return this.shopGrid['shop'][others[1]].addStaff(others[0])
            }
            if (what.toLocaleLowerCase() === 'menu') {
                return this.shopGrid['shop'][others[1]].addMenu(others[0])
            }
        }

        if (one.toLocaleLowerCase() === 'update' && what) {
            return this.shopGrid['shop'][others[1]].upData(what, others[0]);
        }

        if (one.toLocaleLowerCase() === 'delete') {
            return this.shopGrid['shop'][others[0]].delete(what);
        }

        if (one.toLocaleLowerCase() === 'get') {
            if (what) {
                switch (what.toLocaleLowerCase()) {
                    case ('workers'):
                        return this.shopGrid['shop'][others[0]].getWorkers();
                    case ('menu'):
                        return this.shopGrid['shop'][others[0]].getMenu();
                }
            }

            return this.shopGrid['shop']
        }
    }
}

const shopGrid = new ShopGrid();

/**
 * .run((1 - params), (2 - params), (3 - params), (4 - params))
 *
 * 1:string - (get | create | add | update | delete | help)
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
 *        3:object - ({type:string, name:string, price:number, calories:number, composition:array})
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
 *
 */

console.log(shopGrid.run('get'));

console.log(shopGrid.run('create', 'cafe', 'Новгороськая улица, 5-7', 'Кебаб Хаус'));

console.log(shopGrid.run('ADD', 'staff', person1, 'Кебаб Хаус'));
console.log(shopGrid.run('ADD', 'menu', drink1, 'Кебаб Хаус'));
console.log(shopGrid.run('ADD', 'menu', food1, 'Кебаб Хаус'));

console.log(shopGrid.run('get', 'menu', 'Кебаб Хаус'));
