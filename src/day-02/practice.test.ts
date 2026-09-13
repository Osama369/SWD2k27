import { describe, it, expect } from "vitest";
import {
  shippingBand,
  zoneFor,
  baseRate,
  bandMultiplier,
  isFreeShipping,
  displayName,
  shippingCost,
  canCheckout,
} from "./practice.js";

describe("Part A — shippingBand (tarteeb)", () => {
  it("A1: light aur standard", () => {
    expect(shippingBand(0.2)).toBe("light");
    expect(shippingBand(0.99)).toBe("light");
    expect(shippingBand(3)).toBe("standard");
    expect(shippingBand(4.99)).toBe("standard");
  });

  it("A1: heavy aur freight", () => {
    expect(shippingBand(10)).toBe("heavy");
    expect(shippingBand(19.99)).toBe("heavy");
    expect(shippingBand(25)).toBe("freight");
    expect(shippingBand(1000)).toBe("freight");
  });

  it("A1: boundaries — theek 1, 5 aur 20 kg", () => {
    expect(shippingBand(1)).toBe("standard");
    expect(shippingBand(5)).toBe("heavy");
    expect(shippingBand(20)).toBe("freight");
  });
});

describe("Part B — switch", () => {
  it("B1: domestic", () => {
    expect(zoneFor("PK")).toBe("domestic");
  });

  it("B1: regional (grouped cases)", () => {
    expect(zoneFor("IN")).toBe("regional");
    expect(zoneFor("AE")).toBe("regional");
    expect(zoneFor("CN")).toBe("regional");
  });

  it("B1: international (grouped cases)", () => {
    expect(zoneFor("US")).toBe("international");
    expect(zoneFor("UK")).toBe("international");
    expect(zoneFor("DE")).toBe("international");
  });

  it("B1: default — na-maloom country", () => {
    expect(zoneFor("XX")).toBe("unsupported");
    expect(zoneFor("")).toBe("unsupported");
  });

  it("B2: har zone ka base rate", () => {
    expect(baseRate("domestic")).toBe(200);
    expect(baseRate("regional")).toBe(800);
    expect(baseRate("international")).toBe(2500);
  });

  it("B2: na-maloom zone pe 0", () => {
    expect(baseRate("unsupported")).toBe(0);
    expect(baseRate("mars")).toBe(0);
  });

  it("B3: har band ka multiplier", () => {
    expect(bandMultiplier("light")).toBe(1);
    expect(bandMultiplier("standard")).toBe(2);
    expect(bandMultiplier("heavy")).toBe(4);
  });

  it("B3: freight (aur na-maloom) pe 10", () => {
    expect(bandMultiplier("freight")).toBe(10);
    expect(bandMultiplier("kuch-aur")).toBe(10);
  });
});

describe("Part C — logical operators aur truthy/falsy", () => {
  it("C1: Prime member ko hamesha free", () => {
    expect(isFreeShipping(1, true)).toBe(true);
    expect(isFreeShipping(1000, true)).toBe(true);
  });

  it("C1: 5000 ya us se upar free (boundary)", () => {
    expect(isFreeShipping(5000, false)).toBe(true);
    expect(isFreeShipping(6000, false)).toBe(true);
  });

  it("C1: warna free nahi", () => {
    expect(isFreeShipping(4999, false)).toBe(false);
    expect(isFreeShipping(0, false)).toBe(false);
  });

  it("C2: naam se aage peechay ki space hatata hai", () => {
    expect(displayName("Usama")).toBe("Usama");
    expect(displayName("  Usama  ")).toBe("Usama");
  });

  it("C2: khaali naam pe Guest", () => {
    expect(displayName("")).toBe("Guest");
  });

  it("C2: sirf spaces wale naam pe bhi Guest", () => {
    expect(displayName("   ")).toBe("Guest");
    expect(displayName("\t\n")).toBe("Guest");
  });
});

describe("Part D — composition aur guard clauses", () => {
  it("D1: domestic + light", () => {
    expect(shippingCost(0.5, "PK")).toBe(200);
  });

  it("D1: international + heavy", () => {
    expect(shippingCost(10, "US")).toBe(10000);
  });

  it("D1: regional + freight", () => {
    expect(shippingCost(25, "IN")).toBe(8000);
  });

  it("D1: unsupported country pe 0", () => {
    expect(shippingCost(3, "XX")).toBe(0);
  });

  it("D2: khaali cart sab se pehle pakra jaye", () => {
    expect(canCheckout(0, "Karachi", true)).toBe("Cart is empty.");
    // cart khaali hai to baqi masail dekhne ki zaroorat hi nahi
    expect(canCheckout(0, "", false)).toBe("Cart is empty.");
  });

  it("D2: address zaroori hai (khaali aur sirf-space dono)", () => {
    expect(canCheckout(2, "", true)).toBe("Address is required.");
    expect(canCheckout(2, "   ", true)).toBe("Address is required.");
  });

  it("D2: payment verify nahi hui", () => {
    expect(canCheckout(2, "Karachi", false)).toBe("Payment not verified.");
  });

  it("D2: sab theek", () => {
    expect(canCheckout(1, "Karachi", true)).toBe("Ready to checkout.");
    expect(canCheckout(99, "  Lahore  ", true)).toBe("Ready to checkout.");
  });
});
