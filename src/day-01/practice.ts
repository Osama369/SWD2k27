/**
 * DAY 01 — YE AAP KI FILE HAI.
 *
 * Har `TODO` ki jagah asal code likho. `throw new Error(...)` wali line hata dena.
 *
 * Rules:
 *   - `any` nahi. Har parameter aur return pe type likho.
 *   - `let` nahi. Aaj ki har cheez `const` se ho jayegi.
 *   - `console.log` nahi. Function jawab RETURN karta hai, print nahi.
 *   - Har function PURE: bahar ka koi variable na parho, na badlo.
 *
 * Chalao:  npm run test:watch
 */


// ─────────────────────────────────────────────────────────────────────────────
// PART A — STRINGS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TODO A1: naam le kar salam wapas karo.
 *
 *   greet("Usama")  →  "Assalam-o-alaikum, Usama!"
 *
 * Template literal use karo (backticks + ${}), `+` se jorna nahi.
 */
export function greet(name: string): string {
  //throw new Error("TODO A1: greet");
  return `Assalam-o-alaikum, ${name}!`
}

/**
 * TODO A2: quantity ko parhne laiq banao — aur singular/plural ka khayal rakho.
 *
 *   describeQty(1)  →  "1 item"
 *   describeQty(5)  →  "5 items"
 *   describeQty(0)  →  "0 items"
 *
 * Ternary use karo: condition ? agarSach : agarJhoot
 */
export function describeQty(qty: number): string {
  //throw new Error("TODO A2: describeQty");

  // const word = count ===1 ? "messages" : "messages"; // ye dega message ya messages
  //  return `${count} ${word}`  // count =1 --> 1 message if count=4 --> 4 message
  //  return ``
  const word = qty ===1 ? "item" : "items";   // ab words me item ya items han
  return `${qty} ${word}`
  
  // return `${qty ===1 ? "1 item" : "0 item"}` 
}

// ─────────────────────────────────────────────────────────────────────────────
// PART B — NUMBERS: har function sirf EK kaam karega
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TODO B1: ek line ka total.
 *s
 *   lineTotal(3, 250)  →  750
 */
export function lineTotal(quantity: number, unitPrice: number): number {
  // throw new Error("TODO B1: lineTotal");
  return quantity * unitPrice;
}

/**
 * TODO B2: amount mein se `percent` fisad discount kaato.
 * Jawab `Math.round` se poore rupee mein do.
 *
 *   applyDiscount(1000, 10)  →  900
 *   applyDiscount(999, 33)   →  669     (999 - 329.67 = 669.33 → round)
 *
 * Tip: beech ka hisab ek achi naam wali `const` mein rakho.
 */
export function applyDiscount(amount: number, percent: number): number {
  //throw new Error("TODO B2: applyDiscount");

      const discountValue = (amount * percent)/ 100;
      return Math.round(amount- discountValue);

}

/**
 * TODO B3: amount pe `percent` fisad tax lagao. Jawab `Math.round` se poore rupee mein.
 *
 *   addTax(1000, 17)  →  1170
 *   addTax(675, 17)   →  790            (675 + 114.75 = 789.75 → round)
 */ 
export function addTax(amount: number, percent: number): number {
  //throw new Error("TODO B3: addTax");
  const txtValue=  amount * percent / 100;
  return Math.round(amount+ txtValue);
}

/**
 * TODO B4: number ko paisay ki tarah dikhao.
 *
 *   formatPKR(1250)     →  "Rs 1,250"
 *   formatPKR(0)        →  "Rs 0"
 *   formatPKR(1000000)  →  "Rs 1,000,000"
 *
 * Tip: `amount.toLocaleString("en-US")` hazaar wale comma laga deta hai.
 *      "en-US" likhna ZAROORI hai — warna jawab machine ki settings pe chala jayega.
 */
export function formatPKR(amount: number): string {
  //throw new Error("TODO B4: formatPKR");
  return `Rs ${amount.toLocaleString("en-US")}`
}

// ─────────────────────────────────────────────────────────────────────────────
// PART C — COMPOSITION aur LOGIC
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TODO C1: ★ aaj ka sab se aham task ★
 *
 * Poore invoice ka total nikalo — is tarteeb mein:
 *   1. lineTotal      (quantity × unitPrice)
 *   2. applyDiscount  (discount pehle)
 *   3. addTax         (tax hamesha discount ke BAAD lagta hai)
 *
 *   invoiceTotal(3, 250, 10, 17)  →  790
 *   (750 → 10% discount → 675 → 17% tax → 789.75 → round → 790)
 *
 * ✋ SHART: `*`, `/ 100`, ya `Math.round` yahan DOBARA nahi likhna.
 *    Sirf upar wale teen functions ko call karo. Yehi composition hai.
 */
export function invoiceTotal(   // (q=2 , up=250 , dp=10, txtp=17);
  quantity: number,
  unitPrice: number,
  discountPercent: number,
  taxPercent: number,
): number {
  // throw new Error("TODO C1: invoiceTotal");
  const linetot = lineTotal(quantity , unitPrice); //  q * up = 750;
  const applyDis= applyDiscount(linetot, discountPercent); // LT ka 10 perctenage ab applyDis= 675
  return addTax(applyDis,taxPercent);
}

/**
 * TODO C2: number even hai ya nahi.
 *
 *   isEven(4)   →  true
 *   isEven(7)   →  false
 *   isEven(0)   →  true
 *   isEven(-3)  →  false
 *
 * Tip: `%` remainder deta hai. `10 % 3` ka jawab 1 hai.
 * Aur `if (x) return true; else return false;` MAT likhna — comparison khud hi
 * true/false hai, usay seedha return kar do.
 */
export function isEven(n: number): boolean {
  return  n % 2 ===0;
}
/**
 * TODO C3: teen numbers mein se sab se bara.
 *
 *   largestOf3(1, 2, 3)  →  3
 *   largestOf3(9, 2, 3)  →  9
 *   largestOf3(5, 5, 5)  →  5
 *
 * ✋ SHART: `Math.max` use nahi karna, aur `let` bhi nahi.
 *    Sirf `if` aur `return` se socho — ek dafa mein sirf DO cheezein compare karo.
 */
export function largestOf3(a: number, b: number, c: number): number {
  if(a>b && a >c){return a}
  if (b > a && b >c) {
    return b;
  }
  return c;
}
