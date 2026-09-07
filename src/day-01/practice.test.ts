import { describe, it, expect } from "vitest";
import {
  greet,
  describeQty,
  lineTotal,
  applyDiscount,
  addTax,
  formatPKR,
  invoiceTotal,
  isEven,
  largestOf3,
} from "./practice.js";

describe("Part A — strings", () => {
  it("A1: greet karta hai", () => {
    expect(greet("Usama")).toBe("Assalam-o-alaikum, Usama!");
    expect(greet("Ali")).toBe("Assalam-o-alaikum, Ali!");
  });

  it("A2: 1 ke liye singular", () => {
    expect(describeQty(1)).toBe("1 item");
  });

  it("A2: baqi sab ke liye plural", () => {
    expect(describeQty(5)).toBe("5 items");
    expect(describeQty(0)).toBe("0 items");
    expect(describeQty(200)).toBe("200 items");
  });
});

describe("Part B — numbers", () => {
  it("B1: line ka total", () => {
    expect(lineTotal(3, 250)).toBe(750);
    expect(lineTotal(1, 99)).toBe(99);
  });

  it("B1: quantity 0 ho to total 0", () => {
    expect(lineTotal(0, 250)).toBe(0);
  });

  it("B2: discount kaatta hai", () => {
    expect(applyDiscount(1000, 10)).toBe(900);
    expect(applyDiscount(500, 50)).toBe(250);
  });

  it("B2: jawab poore rupee mein round karta hai", () => {
    expect(applyDiscount(999, 33)).toBe(669);
  });

  it("B2: 0% discount pe amount waisa hi rehta hai", () => {
    expect(applyDiscount(1234, 0)).toBe(1234);
  });

  it("B3: tax lagata hai", () => {
    expect(addTax(1000, 17)).toBe(1170);
  });

  it("B3: jawab poore rupee mein round karta hai", () => {
    expect(addTax(675, 17)).toBe(790);
  });

  it("B4: paisay format karta hai", () => {
    expect(formatPKR(1250)).toBe("Rs 1,250");
    expect(formatPKR(0)).toBe("Rs 0");
    expect(formatPKR(1000000)).toBe("Rs 1,000,000");
  });
});

describe("Part C — composition aur logic", () => {
  it("C1: poora invoice total (discount pehle, tax baad mein)", () => {
    expect(invoiceTotal(3, 250, 10, 17)).toBe(790);
  });

  it("C1: bina discount bina tax ke sirf line total", () => {
    expect(invoiceTotal(4, 100, 0, 0)).toBe(400);
  });

  it("C2: even / odd", () => {
    expect(isEven(4)).toBe(true);
    expect(isEven(7)).toBe(false);
    expect(isEven(0)).toBe(true);
    expect(isEven(-3)).toBe(false);
  });

  it("C3: teen mein se sab se bara", () => {
    expect(largestOf3(1, 2, 3)).toBe(3);
    expect(largestOf3(9, 2, 3)).toBe(9);
    expect(largestOf3(1, 9, 3)).toBe(9);
    expect(largestOf3(5, 5, 5)).toBe(5);
    expect(largestOf3(-10, -2, -50)).toBe(-2);
  });

  it("saare functions PURE hain — dobara chalane pe wohi jawab", () => {
    expect(invoiceTotal(3, 250, 10, 17)).toBe(invoiceTotal(3, 250, 10, 17));
    expect(applyDiscount(1000, 10)).toBe(applyDiscount(1000, 10));
    expect(greet("Usama")).toBe(greet("Usama"));
  });
});
