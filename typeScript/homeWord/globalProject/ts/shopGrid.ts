import FastFood from "./fastFood";

class ShopGrid {
    private shopGrid: object = {
        shop: {}
    }

    /** */
    public run(one: string, what: string = null, ...others: any[]): string | Array<any> | void {

        if (one.toLocaleLowerCase() === 'help') {
            return `document commands...`
        }

        /** 1 - create:string; 2 - cafe: string; 3 - address:string; 4 - title:string; */
        if (one.toLocaleLowerCase() === 'create') {
            const length = this.shopGrid[0].length;
            switch (what.toLocaleLowerCase()) {
                case('cafe'): {
                    this.shopGrid[0][length] = new FastFood(others[0], others[1]);
                    return `cafe with the name ${others[1]} created`
                }
            }
        }

        /** 1 - add:string; 2 - staff:string; 3 - number(shop); 4 - person:object */
        if (one.toLocaleLowerCase() === 'add') {
            if (what.toLocaleLowerCase() === 'staff') {
               return this.shopGrid[0][others[0]].addStaff(others[1])
            }
            if (what.toLocaleLowerCase() === 'menu') {
              return this.shopGrid[0][others[0]].addMenu(others[1])
            }
        }

        /** 1 - update:string; 2 - number(shop); 3 - id:string; 4 - data:object */
        if (one.toLocaleLowerCase() === 'update' && typeof +what === "number") {
           return this.shopGrid[0][what].upData(others[0], others[1]);
        }

        /** 1 - delete:string; 2 - number(shop); 3 - id:string */
        if (one.toLocaleLowerCase() === 'delete') {
            return this.shopGrid[0][what].delete(others[0]);
        }

        if (one.toLocaleLowerCase() === 'get') {
            return this.shopGrid[0]
        }
    }
}

export default ShopGrid;
