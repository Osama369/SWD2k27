import { describe as suite, it, expect } from "vitest";
// `import type` is required by verbatimModuleSyntax — types are erased at runtime.
import type { Order } from "./practice.js";
import {
  InvalidTransitionError,
  pay,
  ship,
  deliver,
  cancel,
  describe,
  isRefundable,
  totalRevenue,
} from "./practice.js";

const T0 = new Date("2026-01-01T00:00:00Z");
const T1 = new Date("2026-01-02T00:00:00Z");
const T2 = new Date("2026-01-03T00:00:00Z");
const T3 = new Date("2026-01-04T00:00:00Z");

function pending(id = "A1", amount = 5000): Order {
  return { id, customerId: "cust-1", amount, createdAt: T0, status: "pending" };
}

const paid = (id = "A1", amount = 5000) => pay(pending(id, amount), "tx-1", T1);
const shipped = (id = "A1", amount = 5000) => ship(paid(id, amount), "TRK-9", T2);
const delivered = (id = "A1", amount = 5000) => deliver(shipped(id, amount), T3);

suite("Part B — transitions", () => {
  it("pays a pending order and records the payment", () => {
    const o = paid();
    expect(o.status).toBe("paid");
    expect(o).toMatchObject({ paidAt: T1, transactionId: "tx-1", amount: 5000 });
  });

  it("does not mutate the input order", () => {
    const original = pending();
    const snapshot = { ...original };
    pay(original, "tx-1", T1);
    expect(original).toEqual(snapshot);
  });

  it("refuses to pay an already-paid order", () => {
    expect(() => pay(paid(), "tx-2", T2)).toThrow(InvalidTransitionError);
  });

  it("ships a paid order and keeps the payment data", () => {
    const o = shipped();
    expect(o.status).toBe("shipped");
    expect(o).toMatchObject({ trackingNumber: "TRK-9", shippedAt: T2, transactionId: "tx-1" });
  });

  it("refuses to ship an unpaid order", () => {
    expect(() => ship(pending(), "TRK-9", T2)).toThrow(InvalidTransitionError);
    expect(() => ship(pending(), "TRK-9", T2)).toThrow(/state "pending"/);
  });

  it("delivers a shipped order", () => {
    const o = delivered();
    expect(o.status).toBe("delivered");
    expect(o).toMatchObject({ deliveredAt: T3, trackingNumber: "TRK-9" });
  });

  it("refuses to deliver an order that never shipped", () => {
    expect(() => deliver(paid(), T3)).toThrow(InvalidTransitionError);
  });

  it("cancels from pending and from paid", () => {
    expect(cancel(pending(), "out of stock", T1).status).toBe("cancelled");
    expect(cancel(paid(), "customer changed mind", T2)).toMatchObject({
      status: "cancelled",
      reason: "customer changed mind",
      cancelledAt: T2,
    });
  });

  it("refuses to cancel a delivered order", () => {
    expect(() => cancel(delivered(), "too late", T3)).toThrow(InvalidTransitionError);
  });
});

suite("Part C — logic", () => {
  it("describes every state", () => {
    expect(describe(pending())).toBe("Order #A1 is awaiting payment.");
    expect(describe(paid())).toBe("Order #A1 is paid and awaiting shipment.");
    expect(describe(shipped())).toBe("Order #A1 is in transit (TRK-9).");
    expect(describe(delivered())).toBe("Order #A1 was delivered.");
    expect(describe(cancel(pending(), "fraud", T1))).toBe("Order #A1 was cancelled: fraud");
  });

  it("marks only paid and shipped orders as refundable", () => {
    expect(isRefundable(pending())).toBe(false);
    expect(isRefundable(paid())).toBe(true);
    expect(isRefundable(shipped())).toBe(true);
    expect(isRefundable(delivered())).toBe(false);
    expect(isRefundable(cancel(pending(), "fraud", T1))).toBe(false);
  });

  it("counts revenue from paid, shipped and delivered orders only", () => {
    const orders: Order[] = [
      pending("A1", 1000),
      paid("A2", 2000),
      shipped("A3", 3000),
      delivered("A4", 4000),
      cancel(paid("A5", 5000), "refunded", T2),
    ];
    expect(totalRevenue(orders)).toBe(9000);
  });

  it("returns 0 for an empty list", () => {
    expect(totalRevenue([])).toBe(0);
  });
});
