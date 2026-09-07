/**
 * DAY 12 — YE AAP KI FILE HAI.
 *
 * Rules:
 *   - `any` nahi. `as` nahi. `!` nahi.
 *   - Mutation nahi: har transition NAYA object return karega.
 *   - `npm test` aur `npm run typecheck` — dono green hone chahiye.
 *
 * Test file tab tak COMPILE bhi nahi hogi jab tak Part A mukammal na ho. Ye jaan boojh
 * kar aisa hai — strict TypeScript mein pehle model banta hai, baqi sab usi se nikalta hai.
 */

// ─────────────────────────────────────────────────────────────────────────────
// PART A — THE MODEL
// ─────────────────────────────────────────────────────────────────────────────

/** Wo fields jo har order ke paas har state mein hain. DIYA HUA — `readonly` gaur se dekho. */
interface OrderBase {
  readonly id: string;
  readonly customerId: string;
  /** Order total cents mein (poore number). Sirf integers — paisay ke liye kabhi float nahi. */
  readonly amount: number;
  readonly createdAt: Date;
}

/** DIYA HUA — aap ka worked example. Gaur karo: is ne discriminant ke ilawa kuch add nahi kiya. */
interface PendingOrder extends OrderBase {
  readonly status: "pending";
}

/**
 * TODO A1: paid order ke paas SATH MEIN ye bhi hona chahiye:
 *   - paidAt: Date
 *   - transactionId: string
 * Tracking number NAHI hona chahiye — abhi ship hi nahi hua.
 */
interface PaidOrder extends OrderBase {
  readonly status: "paid";
}

/**
 * TODO A2: shipped order ke paas wo sab kuch ho jo paid order ke paas hai, PLUS:
 *   - trackingNumber: string
 *   - shippedAt: Date
 */
interface ShippedOrder extends OrderBase {
  readonly status: "shipped";
}

/**
 * TODO A3: delivered order ke paas wo sab kuch ho jo shipped order ke paas hai, PLUS:
 *   - deliveredAt: Date
 */
interface DeliveredOrder extends OrderBase {
  readonly status: "delivered";
}

/**
 * TODO A4: cancelled order ke paas ye hona chahiye:
 *   - reason: string
 *   - cancelledAt: Date
 * Aur payment ya shipping ka koi field NAHI.
 */
interface CancelledOrder extends OrderBase {
  readonly status: "cancelled";
}

/** TODO A5: paanchon variants ka discriminated union banao. */
export type Order = PendingOrder; // ← is ki jagah poora union likho

// ─────────────────────────────────────────────────────────────────────────────
// DIYA HUA — infrastructure. Parho, dobara likhne ki zaroorat nahi.
// ─────────────────────────────────────────────────────────────────────────────

export class InvalidTransitionError extends Error {
  constructor(
    readonly from: Order["status"],
    readonly action: string,
  ) {
    super(`Cannot ${action} an order in state "${from}".`);
    this.name = "InvalidTransitionError";
  }
}

/** Exhaustiveness guard. Ise `describe` ke default branch mein use karna hai. */
export function assertNever(value: never, context: string): never {
  throw new Error(`${context}: unhandled variant ${JSON.stringify(value)}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// PART B — TRANSITIONS (pure: purani state andar, nayi state bahar)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TODO B1: sirf `pending` order pay ho sakta hai.
 * Baqi kisi bhi state pe → throw new InvalidTransitionError(order.status, "pay").
 */
export function pay(order: Order, transactionId: string, at: Date): Order {
  throw new Error("TODO B1: pay");
}

/** TODO B2: sirf `paid` order ship ho sakta hai. Error ka action naam: "ship". */
export function ship(order: Order, trackingNumber: string, at: Date): Order {
  throw new Error("TODO B2: ship");
}

/** TODO B3: sirf `shipped` order deliver ho sakta hai. Action naam: "deliver". */
export function deliver(order: Order, at: Date): Order {
  throw new Error("TODO B3: deliver");
}

/**
 * TODO B4: order sirf `pending` YA `paid` se cancel ho sakta hai — aur kahin se nahi.
 * Action naam: "cancel".
 */
export function cancel(order: Order, reason: string, at: Date): Order {
  throw new Error("TODO B4: cancel");
}

// ─────────────────────────────────────────────────────────────────────────────
// PART C — LOGIC PROBLEMS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TODO C1: `switch (order.status)` likho jo BILKUL ye strings return kare.
 * Aakhir mein: `default: return assertNever(order, "describe");`
 *
 *   pending   → `Order #<id> is awaiting payment.`
 *   paid      → `Order #<id> is paid and awaiting shipment.`
 *   shipped   → `Order #<id> is in transit (<trackingNumber>).`
 *   delivered → `Order #<id> was delivered.`
 *   cancelled → `Order #<id> was cancelled: <reason>`
 */
export function describe(order: Order): string {
  throw new Error("TODO C1: describe");
}

/**
 * TODO C2: refund sirf tab mumkin hai jab order `paid` ya `shipped` ho.
 * Ise TYPE PREDICATE ki tarah likho taake caller ko narrowing mile:
 *   `order is PaidOrder | ShippedOrder`
 */
export function isRefundable(order: Order): boolean {
  throw new Error("TODO C2: isRefundable");
}

/**
 * TODO C3: un tamam orders ka `amount` jodo jo payment tak pohanch gaye — yani
 * `paid`, `shipped` ya `delivered`. `pending` aur `cancelled` ko chhod do.
 *
 * Constraints: sirf `filter` + `reduce`. Na `for`/`while`. Na `let`. Na mutation.
 */
export function totalRevenue(orders: readonly Order[]): number {
  throw new Error("TODO C3: totalRevenue");
}
