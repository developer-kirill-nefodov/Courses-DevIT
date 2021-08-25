class ShopGrid {
    shopGrid = {
        shop: []
    }

    getShop() {
        return this.shopGrid.shop.map(e => e)
    }
}

const shopGrid = new ShopGrid()