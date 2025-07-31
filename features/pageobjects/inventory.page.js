const Page = require("../pageobjects/page");

class Inventory extends Page {
  get inventoryContainer() {
    return $(".inventory_container");
  }
  get itemNames() {
    return $$(".inventory_item_name");
  }
  get itemPrices() {
    return $$(".inventory_item_price");
  }
  get sortDownContainer() {
    return $(".product_sort_container");
  }
  async isInventoryDisplayed() {
    return await this.inventoryContainer.isDisplayed();
  }
  async sortBy(option) {
    const optionMap = {
      az: "az",
      za: "za",
      lohi: "lohi",
      hilo: "hilo",
    };

    const value = optionMap[option.toLowerCase()];
    if (!value) throw new Error("Unknown sort option: " + option);

    const select = await this.sortDownContainer;
    await select.selectByAttribute("value", value);

    await browser.pause(1000);
  }

  async isSortedCorrectly(type) {
    if (type === "az" || type === "za") {
      const nameElements = await this.itemNames;
      const names = [];
      for (const el of nameElements) {
        names.push(await el.getText());
      }

      const cleaned = names.map((name) => name.trim());
      const sorted = [...cleaned].sort((a, b) =>
        type === "az" ? a.localeCompare(b) : b.localeCompare(a)
      );

      return cleaned.every((val, idx) => val === sorted[idx]);
    } else if (type === "lohi" || type === "hilo") {
      const priceElements = await this.itemPrices;
      const prices = [];
      for (const el of priceElements) {
        const text = await el.getText();
        const value = parseFloat(text.replace(/[^0-9.]/g, ""));
        prices.push(value);
      }
      if (type === "lohi") {
        const sorted = [...prices].sort((a, b) => a - b);
        return prices.every((val, idx) => Math.abs(val - sorted[idx]) < 0.01);
      } else {
        const sorted = [...prices].sort((a, b) => b - a);
        return prices.every((val, idx) => val === sorted[idx]);
      }
    } else {
      throw new Error(`Unknown sort type: ${type}`);
    }
  }
}
module.exports = new Inventory();
