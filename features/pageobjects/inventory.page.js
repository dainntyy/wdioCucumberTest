const Page = require("../pageobjects/page");

class Inventory extends Page {
  get inventoryContainer() {
    return $(".inventory_container");
  }
  async isInventoryDisplayed() {
    return await this.inventoryContainer.isDisplayed();
  }
}
module.exports = new Inventory();
