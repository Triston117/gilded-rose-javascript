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
  it("never increases quality over 50", () => {
    const testItem = new Item("Aged Brie", 3, 50);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(50);
  });
  it("Sulfuras, Hand of Ragnaros never decreases in quality", () => {
    const testItem = new Item("Sulfuras, Hand of Ragnaros", 3, 40);
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(40);
  });
  it("Backstage passes to a TAFKAL80ETC concert increase in `quality` as it's `sellIn` value decreases", () => {
    const testItem = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      3,
      40
    );
    items.push(testItem);
    updateQuality();
    expect(testItem.quality).toBe(43);
  });
  it("increases quality by 2 when there are <= 10 days before 'Back stage passes'", () => {
    const testItem = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      10,
      4
    );
    items.push(testItem);
    updateQuality();
    expect(testItem.sellIn).toBe(9);
    expect(testItem.quality).toBe(6);
  });
  it("increases quality by 2 when there are <= 5 days before 'Back stage passes'", () => {
    const testItem = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      5,
      8
    );
    items.push(testItem);
    updateQuality();
    expect(testItem.sellIn).toBe(4);
    expect(testItem.quality).toBe(11);
  });
  it("Set quality to 0 when concert has ended", () => {
    const testItem = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      -1,
      5
    );
    items.push(testItem);
    updateQuality();
    expect(testItem.sellIn).toBe(-2);
    expect(testItem.quality).toBe(0);
  });
  it("Conjured items reduce quality by 2", () => {
    const testItem = new Item("Conjured", 5, 10);
    items.push(testItem);
    updateQuality();
    expect(testItem.sellIn).toBe(4);
    expect(testItem.quality).toBe(8);
  });
});
