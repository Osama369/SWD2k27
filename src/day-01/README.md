# Day 01 — Values, Variables, aur Functions

Aaj koi `interface` nahi, koi `class` nahi, koi fancy cheez nahi. Sirf wo chaar cheezein
jin par baqi 20 din khare honge:

**value → variable → function → return**

## 1. TypeScript hai kya?

JavaScript browser/Node mein chalti hai. Uska masla ye hai ke wo galti **chalne ke baad**
batati hai:

```js
const price = "500";     // ye string hai, number nahi
const total = price * 2; // JS: 1000 ... theek lag raha hai
const total2 = price + 2; // JS: "5002"  ← ab bug hai, aur koi warning nahi
```

TypeScript = JavaScript + **types jo chalne se PEHLE check hote hain.**

```ts
const price: number = "500";
//    ^ Error: Type 'string' is not assignable to type 'number'.
```

Ye error terminal mein aaya, customer ke saamne nahi. **Yehi TypeScript ka poora maqsad hai:
bug ko production se utha kar aap ke editor mein le aana.**

TypeScript browser mein chalti nahi — wo compile ho kar JavaScript banti hai. Types sirf
likhne ke waqt zinda hote hain, chalne ke waqt gayab. Isi liye `npm run typecheck` alag
command hai.

## 2. Value aur Variable ka farq

- **Value** = asal cheez. `500`, `"Usama"`, `true`.
- **Variable** = us value ko diya gaya naam, taake dobara use kar sako.

```ts
const unitPrice = 500;   // value 500 hai, variable ka naam unitPrice hai
```

## 3. `const` vs `let` (aur `var` kyun nahi)

```ts
const rate = 50;
rate = 60;        // ❌ Error: Cannot assign to 'rate' because it is a constant.

let total = 0;
total = 100;      // ✅ theek hai
```

**Rule jo har acha engineer follow karta hai: hamesha `const` se shuru karo. `let` sirf tab
jab aap ko waqai value badalni ho.**

Kyun? Kyunke `const` parhne wale ko ek guarantee deta hai — "ye naam aage ja kar kuch aur
nahi ban jayega." Jab aap 300 line ki file parh rahe ho, ye guarantee aap ka dimagh bachati
hai. `let` dekhte hi aap ko poori file mein dhoondna parta hai ke ye kahan-kahan badla.

`var` purani JS ka hai. Uske scope rules toote hue hain. **Hum use kabhi nahi karenge.**

## 4. Primitive types

| Type | Misaal | Kab |
|---|---|---|
| `string` | `"Usama"`, `` `Rs ${x}` `` | text |
| `number` | `500`, `3.14`, `-20` | har number (JS mein int/float alag nahi) |
| `boolean` | `true`, `false` | haan/nahi |
| `null` | `null` | "yahan jaan boojh kar kuch nahi hai" |
| `undefined` | `undefined` | "yahan value set hi nahi hui" |

## 5. Type annotation vs Type inference

```ts
const a: number = 500;   // annotation — aap ne khud likha
const b = 500;           // inference — TS ne khud samajh liya ke ye number hai
```

Dono ka type `number` hai. **Variables pe annotation likhne ki zaroorat aam tor pe nahi
hoti** — TS khud samajh leta hai, aur zabardasti likhna sirf shor hai.

Lekin **function ke parameters pe annotation lazmi hai** (TS khud nahi jaan sakta ke caller
kya bhejega), aur **return type khud likhna ek achi aadat hai** — neeche wajah batata hoon.

## 6. Function ki anatomy

```ts
function lineTotal(quantity: number, unitPrice: number): number {
//       ^name    ^parameters (input, types ke sath)      ^return type
  return quantity * unitPrice;
//^ ye function ka jawab bahar bhejta hai
}

const total = lineTotal(3, 250);  // 750
```

**Return type khud kyun likhen, jab TS khud nikal sakta hai?**

Kyunke wo aap ka **contract** hai. Agar aap `: number` likh do aur andar galti se string
return kar do, error usi function pe aayega — theek us jagah jahan galti hui. Agar aap na
likho, TS chup chaap return type `string` maan lega, aur error 3 files door us jagah phatega
jahan kisi ne is function ka jawab use kiya. **Galti ko uske asal maqam pe pakarna — yehi
senior aur junior debugging ka farq hai.**

### Function jo kuch return nahi karta

```ts
function logTotal(total: number): void {
  console.log(total);   // return nahi kiya
}
```

`void` ka matlab: "ye function jawab nahi deta, sirf kaam karta hai."

## 7. Template literals

Normal quotes ke bajaye backticks (`` ` ``) use karo, phir `${}` ke andar koi bhi value daal do:

```ts
const name = "Usama";
const qty = 3;

const bad  = "Salam, " + name + "! Aap ke " + qty + " items hain.";  // takleef-deh
const good = `Salam, ${name}! Aap ke ${qty} items hain.`;            // saaf
```

## 8. Pure function — aaj ka senior principle

> **Function ko sirf apne parameters se kaam lena chahiye, aur sirf return karna chahiye.**

```ts
// ✅ PURE — sirf input se output. 100 dafa chalao, hamesha 750.
function lineTotal(quantity: number, unitPrice: number): number {
  return quantity * unitPrice;
}

// ❌ IMPURE — bahar ki cheez pe depend karta hai aur bahar ki cheez badalta hai
let cartTotal = 0;
function addToCart(price: number): void {
  cartTotal = cartTotal + price;   // bahar ka variable badal diya
}
```

Pure function kyun behtar hai:
- **Test karna aasan** — input do, output check karo. Koi setup nahi.
- **Samajhna aasan** — poori kahani function ke andar hai, poori file mein bikhri nahi.
- **Bharosay ke laiq** — kal koi aur bhi `cartTotal` badal de to `addToCart` ka jawab badal
  jayega, aur aap ghanton dhoondte rahoge ke kis ne badla.

Aaj aap jitne bhi functions likhoge, **saare pure honge.**

---

## Aaj ke tasks

[practice.ts](practice.ts) kholo. Har `TODO` ko poora karo taake
[practice.test.ts](practice.test.ts) ke saare tests pass ho jayen.

### Part A — Strings aur values
- **A1** `greet(name)` → `"Assalam-o-alaikum, Usama!"`
- **A2** `describeQty(qty)` → `"1 item"` agar qty 1 ho, warna `"5 items"`

### Part B — Numbers aur ek-ek kaam ke functions
- **B1** `lineTotal(quantity, unitPrice)` → quantity × unitPrice
- **B2** `applyDiscount(amount, percent)` → discount kaat kar, `Math.round` se poora rupee
- **B3** `addTax(amount, percent)` → tax laga kar, `Math.round` se poora rupee
- **B4** `formatPKR(amount)` → `"Rs 1,250"`

### Part C — Composition aur logic
- **C1** `invoiceTotal(quantity, unitPrice, discountPercent, taxPercent)`
  — B1 → B2 → B3 ko **isi tarteeb** mein use karo. Formula dobara mat likhna.
- **C2** `isEven(n)` → `true` / `false`
- **C3** `largestOf3(a, b, c)` → sab se bara. **`Math.max` use nahi karna** — `if`/`else`
  se khud socho.

## Aaj ke rules

- ✋ **`any` nahi.** Har parameter aur har return pe type likho.
- ✋ **`let` nahi** — aaj ki har cheez `const` se ho jayegi. (C3 mein bhi.)
- ✋ **Koi `console.log` final code mein nahi.** Function jawab **return** karta hai, print nahi.
- ✅ Saare functions **pure** — bahar ka koi variable na parho na badlo.
- ✅ `npm test` aur `npm run typecheck` — dono green.

## Chalane ka tareeqa

```bash
npm test              # ek dafa chala kar dekho
npm run test:watch    # ye behtar hai — file save karo, tests khud dobara chalte hain
npm run typecheck     # types check
```

Shuru mein **16 tests fail** honge. Wohi aap ki to-do list hai. Upar se neeche green karte jao.
