# Day 12 — Types Aap ka Pehla Design Tool Hai

## Ye Day 1 kyun hai (aur "variables aur loops" kyun nahi)

Junior developer types ko is liye use karta hai ke jo data pehle se mojood hai usko
**describe** kar sake.

Senior developer types ko is liye use karta hai ke jo states kabhi honi hi nahi chahiye,
unko **forbid** kar de — yani unka wajood hi na-mumkin bana de.

Bas yehi ek farq hai. Isi wajah se ek code mein 40 `if` checks lagte hain, aur dusre code
mein compiler khud bug ko likhne hi nahi deta.

Aaj ka senior principle:

> **Make illegal states unrepresentable.**
> (Ghalat states ko type system mein represent hi na hone do.)

## Real-world scenario

Aap ek e-commerce backend ka order handling bana rahe ho. Order aise move karta hai:

```
pending  ──pay──►  paid  ──ship──►  shipped  ──deliver──►  delivered
   │                 │
   └──cancel──►  cancelled  ◄──cancel──┘
```

Business rules jo har haal mein sach honi chahiye:
1. `pending` order ke paas `paidAt` **nahi** hoga aur `trackingNumber` bhi **nahi**.
2. `paid` order ke paas `paidAt` aur `transactionId` **zaroor** honge. Tracking number abhi nahi.
3. `shipped` order ke paas `paidAt` + `trackingNumber` dono **zaroor** honge.
4. `cancelled` order ke paas `reason` **zaroor** hoga.
5. Bina paid kiye order ship nahi ho sakta. Delivered order cancel nahi ho sakta.

### Junior wala tareeqa (ye NAHI karna)

```ts
interface Order {
  id: string;
  status: string;          // "pending" | typo "Pending" | "shpped"? compiler ko koi farq nahi
  paidAt?: Date;           // har state pe optional = kahin bhi enforce nahi hua
  trackingNumber?: string;
  reason?: string;
}
```

Ye type khushi khushi ye cheez allow kar deta hai:

```ts
{ status: "pending", trackingNumber: "TRK1" }
```

Yani aisa order jo ship ho chuka hai lekin paisay diye hi nahi gaye. Ek ghost order.

Ab dhyan se samjho ye chain kaise chalti hai:
bug **possible** ban gaya → possible cheez kabhi na kabhi **hoti** hai → phir aap runtime
pe `if` guards lagana shuru karte ho → wo guards waqt ke sath reality se **drift** kar jate
hain (code change hota hai, guard purana reh jata hai) → production bug.

Asal masla ye tha: **type ne jhoot bola.** Usne kaha "trackingNumber optional hai", jabke
haqeeqat mein wo sirf shipped state mein exist karta hai.

### Senior wala tareeqa

Hum **discriminated union** banate hain: har state ka apna alag variant, aur har variant ke
paas sirf wohi data jo us state ka hai — na kam na zyada.

Ab `{ status: "pending", trackingNumber: "TRK1" }` likhna **compile error** hai.
Bug ko type hi nahi kiya ja sakta. Test ki bhi zaroorat nahi — compiler ne pehle rok diya.

## Aaj ke concepts (ye samajhna zaroori hai, ratna nahi)

| Concept | Aasan matlab |
|---|---|
| Literal type | `"paid"` ek type hai jiski sirf **ek** value ho sakti hai — `"paid"` |
| Union `\|` | "in shapes mein se koi **ek**" |
| Discriminated union | aisa union jismein ek common field (`status`) batata hai ke kaunsa variant hai |
| Narrowing | check karne ke baad TS ka union ko chhota kar dena (`if` / `switch` ke andar) |
| `readonly` | field banane ke baad change nahi ho sakti → immutability |
| Exhaustiveness | `never` wali trick — nayi state add karo aur case bhoolo to compiler cheekhta hai |
| Type predicate | `x is Foo` — function jo compiler ko sikhata hai ke aap ne kya prove kiya |

## Aap ke tasks

[practice.ts](practice.ts) kholo. Usme stubs aur TODOs likhe hain.
[practice.test.ts](practice.test.ts) ke saare tests pass karne hain.

**Part A — Model (sirf types, koi logic nahi)**
1. Paanch order variants ka discriminated union `Order` banao.
2. Har field pe `readonly` lagao.

**Part B — Transitions (pure functions)**
3. `pay(order, transactionId, at)` — sirf `pending` se.
4. `ship(order, trackingNumber, at)` — sirf `paid` se.
5. `deliver(order, at)` — sirf `shipped` se.
6. `cancel(order, reason, at)` — sirf `pending` ya `paid` se.

   Ghalat transition pe `InvalidTransitionError` **throw** karna hai.

**Part C — Logic problems**
7. `describe(order)` — `status` pe `switch`, aur exhaustiveness guard ke sath.
8. `isRefundable(order)` — refundable tab jab `paid` ya `shipped` ho (delivered aur cancelled nahi).
9. `totalRevenue(orders)` — un orders ka `amount` jodo jo `paid` ya us se aagay pohanch gaye,
   cancelled ko **chhod kar**. `reduce` se likhna hai — na `for` loop, na mutation.

## Aaj ke rules
- ✋ **`any` nahi. `as` nahi. `!` nahi.** Agar aap ka haath in teeno ki taraf jaye, iska matlab
  aap ka **model ghalat hai** — model theek karo, call site pe patch mat lagao.
- ✋ Mutation nahi. Har transition **naya** order object return karega.
- ✅ `npm test` aur `npm run typecheck` — dono green hone chahiye.

## Pehla output aisa hi aayega (ghabrana nahi)

`npm run typecheck` chalao ge to ye milega:

```
error TS6196: 'PaidOrder' is declared but never used.
error TS6196: 'ShippedOrder' is declared but never used.
...
```

Ye bug nahi hai. Ye compiler aap ko bata raha hai ke **task A5 abhi wire nahi hua**.
Chaaron interfaces mojood hain lekin koi unko use nahi kar raha, kyunke `Order` abhi sirf
`PendingOrder` hai. Union bana do — chaaron errors ek sath gayab ho jayenge.

`npm test` pe **13 failing tests** aayenge. Wohi aap ki to-do list hai. Upar se neeche green karte jao.
