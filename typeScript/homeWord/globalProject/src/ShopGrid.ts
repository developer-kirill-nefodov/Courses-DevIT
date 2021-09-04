import FastFood from "./FastFood.js";
import {help} from "./function.js";

export default class ShopGrid {
    private shopGrid: object = {
        shop: {}
    }

    public run(one: string, what: string = null, ...others: any[]): string | Array<any> | void {

        if (one.toLocaleLowerCase() === 'help') {
            return help()
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

        if (one.toLocaleLowerCase() === 'order') {
            if (what) {
             return this.shopGrid['shop'][what].purchase(others[0], others[1], others[2], others[3], others[4])
            }
        }
    }
}