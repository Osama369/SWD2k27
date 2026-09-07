/**
 * DAY 01 — REFERENCE SOLUTION (ek dafa parho, phir band kar do)
 *
 * DHYAN DO: maine jaan boojh kar aap ke task se ALAG domain liya hai.
 * Aap ke paas shopping invoice hai. Mere paas bijli ka bill.
 * Technique bilkul wohi hai, cheezon ke naam alag — taake aap copy-paste na kar sako.
 * Aap ko *tareeqa* seekhna hai, *text* nahi.
 */

// ─────────────────────────────────────────────────────────────────────────────
// PART A — STRINGS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sab se saada function jo mumkin hai. Isay tukron mein torr kar dekho:
 *
 *   function        → keyword: "main ek function bana raha hoon"
 *   greetCustomer   → naam. Function kaam karta hai, is liye naam mein verb acha lagta hai.
 *   (name: string)  → parameter. `name` andar aane wali value ka naam hai,
 *                     `: string` compiler se waada hai ke ye text hi hoga.
 *   : string        → return type. "ye function jawab mein text dega."
 *   return          → jawab bahar bhejta hai. Yahan function khatam.
 *
 * Backticks (`) wali string ko template literal kehte hain. Uske andar ${} likh kar
 * koi bhi value seedhi ghusayi ja sakti hai — "..." + name + "..." se kahin saaf.
 */
export function greetCustomer(name: string): string {
  return `Assalam-o-alaikum, ${name}!`;
}

/**
 * Ternary operator: `condition ? agarSach : agarJhoot`
 *
 * Ye chhota `if/else` hai jo **value deta hai** (statement nahi, expression hai) —
 * is liye ise seedha `${}` ke andar likha ja sakta hai.
 *
 * Jab kaam sirf "do mein se ek value chuno" ho, ternary hi behtar hai. Lekin agar
 * do se zyada branches ho jayen ya har branch mein kai lines ho, to poora `if/else`
 * likho — ternary ko ghusa ghusa kar likhna parhne walon pe zulm hai.
 */
export function describeUnits(units: number): string {
  return `${units} ${units === 1 ? "unit" : "units"}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// PART B — NUMBERS: har function sirf EK kaam karta hai
// ─────────────────────────────────────────────────────────────────────────────

/**
 * PURE function ki misaal.
 * Bahar ka koi variable na parha, na badla. Sirf parameters se jawab banaya.
 * Isi liye ye 1000 dafa chalao — jawab hamesha wohi aayega, aur test likhna aasan hai.
 */
export function energyCharge(units: number, ratePerUnit: number): number {
  return units * ratePerUnit;
}

/**
 * Subsidy kaat kar amount wapas.
 *
 * `Math.round` kyun? Kyunke paisay ke hisab mein 4823.7 rupees ka koi matlab nahi.
 * Aur `Math.round(x)` `x` ko badalta nahi — wo NAYA number banata hai.
 * Ye baat aage bohot kaam aayegi: numbers aur strings JS mein immutable hain.
 *
 * Gaur karo maine `const` se ek beech ka naam bana liya. Ek line mein ghusa dena
 * chalaki lagti hai, lekin `discount` naam parhne wale ko batata hai ke ye number
 * hai kya. **Achi naam wali const = muft ka comment.**
 */
export function applySubsidy(amount: number, percent: number): number {
  const subsidy  = (amount * percent) / 100;
  return Math.round(amount - subsidy);        
}

export function addGst(amount: number, percent: number): number {
  const gst = (amount * percent) / 100; 
  return Math.round(amount + gst);
}

/**
 * `toLocaleString("en-US")` number mein hazaar wale comma laga deta hai:
 *   1250    → "1,250"
 *   1000000 → "1,000,000"
 *
 * "en-US" likhna zaroori hai. Agar khaali chhod do to ye machine ki settings pe chala
 * jayega — aap ke laptop pe test pass, server pe fail. **Formatting hamesha explicit rakho.**
 */
export function formatPKR(amount: number): string {
  return `Rs ${amount.toLocaleString("en-US")}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// PART C — COMPOSITION: chhote functions jorr kar bara kaam
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ★ AAJ KI SAB SE AHAM CHEEZ ★
 *
 * Gaur karo maine yahan `units * rate` ya `* percent / 100` DOBARA nahi likha.
 * Maine sirf upar wale functions ko tarteeb se call kiya hai.
 *
 * Isay COMPOSITION kehte hain: chhote, tested tukron se bara kaam banana.
 *
 * Kyun ahmiyat rakhta hai: kal agar GST ka hisab badal jaye, to aap `addGst` ki EK
 * jagah theek karoge — aur poore system mein theek ho jayega. Agar aap ne formula
 * har jagah dobara likha hota, to aap 12 files mein dhoondte phirte, 11 theek karte,
 * aur 12wi bhool jate. **Wohi bhooli hui 12wi jagah production bug hai.**
 *
 * Tarteeb bhi business rule hai: subsidy PEHLE, GST BAAD MEIN.
 * (Tax hamesha discount ke baad wali qeemat pe lagta hai.) Agar aap ye do line
 * ulat den to number badal jayega aur compiler kuch nahi kahega — is liye is tarah
 * ki tarteeb ko test se lock karna parta hai.
 */
export function billTotal(
  units: number,  // 100
  ratePerUnit: number,  // 20
  subsidyPercent: number,  // 10
  gstPercent: number,  // 5
): number {
  const charge = energyCharge(units, ratePerUnit);
  const afterSubsidy = applySubsidy(charge, subsidyPercent);
  return addGst(afterSubsidy, gstPercent);
}

/**
 * `boolean` return karne wale function ka naam hamesha `is` / `has` / `can` se shuru karo.
 * `isPeakHour(20)` parh kar hi pata chal jata hai ke jawab haan/nahi mein hoga.
 *
 * Aur dekho maine ye NAHI likha:
 *
 *   if (hour >= 18 && hour <= 22) { return true; } else { return false; }
 *
 * Kyunke `hour >= 18 && hour <= 22` KHUD HI pehle se `true` ya `false` hai.
 * Usay `if` mein daal kar `true`/`false` return karna fuzool lamba hai.
 * **Comparison ka natija seedha return kar do.**
 */
export function isPeakHour(hour: number): boolean {
  return hour >= 18 && hour <= 22;
}

/**
 * Teen mein se sab se chhota — bina `Math.min` ke.
 *
 * Yahan sochne ka tareeqa ye hai: ek dafa mein sirf DO cheezein compare karo.
 * Pehle a aur b ka faisla, phir jeetne wale ka c se muqabla.
 *
 * Gaur karo ek bhi `let` nahi hai. Log aksar likhte hain:
 *
 *   let smallest = a;
 *   if (b < smallest) smallest = b;    // ab `smallest` badal raha hai
 *   if (c < smallest) smallest = c;    // dobara badal raha hai
 *
 * Wo bhi chal jata hai, lekin ab ek aisa variable hai jo waqt ke sath badalta hai —
 * yani parhne wale ko poori history dimagh mein rakhni parti hai. Neeche wale tareeqe
 * mein har `return` ek mukammal, hatmi jawab hai. Kuch badalta hi nahi.
 */
export function smallestOf3(a: number, b: number, c: number): number {
  if (a <= b && a <= c) {
    return a;
  }
  if (b <= c) {
    return b;
  }
  return c;
}
