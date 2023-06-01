import { expect, describe, it, test } from "vitest";
import { Item, items, updateQuality } from "./gilded-rose.js";

describe("updateQuality", () => {
  it("reduces quality and sellIn of basic items by 1", () => {
    const testItem = new Item("basic", 5, 3);
    items.push(testItem);

    updateQuality();
    expect(testItem.sellIn).toBe(4);
    expect(testItem.quality).toBe(2);
  });

  it("reduces quality by 2 for items with sellIn < 0", () => {
    const testItem = new Item("basic", -2, 8);
    items.push(testItem);

    updateQuality();
    expect(testItem.quality).toBe(6);
    expect(testItem.sellIn).toBe(-3);
  });

  it("does not reduce quality to a negative number", () => {
    const testItem = new Item("basic", 2, 0);
    items.push(testItem);

    updateQuality();
    expect(testItem.quality).toBe(0);
  });
  it("it increases in quality of 'Aged Brie' items", () => {
    const testItem = new Item("Aged Brie", 3, 8);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(9);
  });
});
