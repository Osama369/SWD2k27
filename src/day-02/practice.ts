/**
 * DAY 02 — YE AAP KI FILE HAI.
 *
 * Domain: shipping / delivery rules.
 *
 * Rules:
 *   - `any` nahi. `let` nahi. `console.log` nahi.
 *   - `==` nahi — hamesha `===`.
 *   - `return` ke baad `else` nahi. Guard clause style.
 *   - `switch` mein `break` nahi — seedha `return`.
 *   - Kaam khatam hote hi `throw new Error(...)` wali line DELETE karo — comment nahi.
 *
 * Chalao:  npm run test:watch
 */



// ─────────────────────────────────────────────────────────────────────────────
// PART A — if / else if : TARTEEB HI LOGIC HAI
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TODO A1: parcel ka wazan band.
 *
 *   "light"     →  1 kg se kam
 *   "standard"  →  1 se 4.99 kg
 *   "heavy"     →  5 se 19.99 kg
 *   "freight"   →  20 kg aur us se upar
 *
 *   shippingBand(0.5)  →  "light"
 *   shippingBand(1)    →  "standard"    ← boundary! theek 1 kg standard hai
 *   shippingBand(5)    →  "heavy"       ← boundary!
 *   shippingBand(20)   →  "freight"     ← boundary!
 *
 * ✋ TARTEEB pe dhyan do. Agar `weightKg < 20` pehle likh diya to 0.5 kg wala
 *    parcel bhi wahin phans jayega — kyunke 0.5 bhi 20 se kam hai.
 *    Sab se CHHOTI shart sab se upar.
 *
 * ✋ `else` mat likho. Har `if` ke andar `return` hai, is liye `else` fuzool hai.
 */
export function shippingBand(weightKg: number): string {
  // throw new Error("TODO A1: shippingBand");
  if (weightKg <1)   return "light";   // 1 se kam yani 0.5 etc
  
  if (weightKg <5 ) return "standard";  // 1 se 4.99
  
  if (weightKg < 20) return "heavy"; // 5 se lekar 19.99 tak
   return "freight"; // 20 yas use bara
}

// ─────────────────────────────────────────────────────────────────────────────
// PART B — switch
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TODO B1: country code se shipping zone.
 *
 *   "PK"  code                  →  "domestic"   zone
 *   "IN" | "AE" | "CN"      →  "regional"   
 *   "US" | "UK" | "DE"      →  "international"
 *   koi aur (jaise "XX")    →  "unsupported"
 *
 * ✋ `switch` use karo, `if/else` nahi — yahan ek hi cheez ki EXACT value match ho rahi hai.
 * ✋ Grouped cases use karo: teen `case` ek doosre ke upar, phir ek `return`.
 * ✋ `break` mat likho — seedha `return`.
 * ✋ `default` zaroor likho.
 */
export function zoneFor(country: string): string {   // zon for country code
  switch (country) {
    case "PK":
     return "domestic";
      
     // group cases 
    case "IN":
    case "AE":
    case "CN":  
     return "regional";

    case "US":
    case "UK":
    case "DE":    
      return "international";
    
    default:
      return "unsupported";
  }
}

/**
 * TODO B2: har zone ka base kiraya (rupees).
 *
 *   "domestic"       →  200
 *   "regional"       →  800
 *   "international"  →  2500
 *   koi aur          →  0
 */
export function baseRate(zone: string): number {
  // throw new Error("TODO B2: baseRate");
  switch (zone) {
    case "domestic":
      return 200;
  

    case "regional":
      return 800;
      
    case "international":
      return 2500;  
    default:
      return 0;
  }
}

/**
 * TODO B3: wazan band ke hisab se guna (multiplier).
 *    ban  (key)    XX (value)
 *   "light"     →  1
 *   "standard"  →  2
 *   "heavy"     →  4
 *   koi aur     →  10        ← "freight" bhi yahin aa jayega
 */
export function bandMultiplier(band: string): number {
  switch (band) {
    case "light":
      return 1;
    
    case "standard":  
      return 2;

    case "heavy":  
      return 4;

    default:
     return 10;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PART C — logical operators aur truthy / falsy
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TODO C1: shipping free hai agar customer Prime member hai, YA order 5000 se
 * kam nahi hai (yani 5000 ya us se zyada).
 *
 *   isFreeShipping(6000, false)  →  true
 *   isFreeShipping(5000, false)  →  true      ← boundary! theek 5000 bhi free
 *   isFreeShipping(1000, true)   →  true
 *   isFreeShipping(1000, false)  →  false
 *
 * ✋ `if (...) return true; else return false;` MAT likhna. Shart khud hi
 *    true/false hai — usay seedha return karo.
 */
export function isFreeShipping(orderTotal: number, isPrime: boolean): boolean {
  // throw new Error("TODO C1: isFreeShipping");
  return isPrime || orderTotal>=5000;
}

// calling here just for understanding:
 // isFreeShipping(false , 5000 ) true
 // (true , 4000) true
 // (true, 6000) true
 // (false, 1000) fasle

/**
 * TODO C2: naam ko dikhane ke laiq banao.
 *
 *   displayName("Usama")       →  "Usama"
 *   displayName("  Usama  ")   →  "Usama"     ← aage peechay ki space hat gayi
 *   displayName("")            →  "Guest"
 *   displayName("   ")         →  "Guest"     ← ★ ye asal test hai ★
 *
 * ✋ JAAL: `if (!name) return "Guest";` ye KAAFI NAHI hai.
 *    `"   "` JavaScript mein TRUTHY hai — wo non-empty string hai!
 *    Pehle `.trim()` karo, PHIR check karo.
 *
 * ✋ `name.trim()` do dafa mat likhna — ek `const` mein rakh lo.
 */
// name = ""  ya " usama " krdya to isme whitesapce han
export function displayName(name: string): string {
  // throw new Error("TODO C2: displayName");
    const trimed =name.trim();  //  agr "" bya " usama  "  -->  "usama" krdega
    if (trimed === "") return "Guest";
    return trimed;
}

// ─────────────────────────────────────────────────────────────────────────────
// PART D — composition aur guard clauses
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TODO D1: poora shipping kiraya.
 *
 *   base rate (country se)  ×  multiplier (wazan se)
 *
 *   shippingCost(0.5, "PK")  →  200      (domestic 200 × light 1)
 *   shippingCost(10, "US")   →  10000    (international 2500 × heavy 4)
 *   shippingCost(25, "IN")   →  8000     (regional 800 × freight 10)
 *   shippingCost(3, "XX")    →  0        (unsupported 0 × standard 2)
 *
 * ✋ SHART: yahan koi naya hisab NAHI. Sirf apne banaye chaar functions call karo.
 *
 * Bahaav aisa hai:
 *   country   ──► zoneFor()       ──► zone ──► baseRate()        ──► rate
 *   weightKg  ──► shippingBand()  ──► band ──► bandMultiplier()  ──► multiplier
 *                                                     rate × multiplier
 */
export function shippingCost(weightKg: number, country: string): number {
  //
const zone =zoneFor(country);
const band = shippingBand(weightKg);
const rate = baseRate(zone);
const multiplier=bandMultiplier(band);
return rate * multiplier;
}

/**
 * TODO D2: ★ aaj ka asal task — GUARD CLAUSES ★
 *
 * Checkout ho sakta hai ya nahi, aur agar nahi to kyun nahi.
 *
 *   itemCount 0 ho                    →  "Cart is empty."
 *   address khaali ya sirf spaces ho  →  "Address is required."
 *   isPaymentVerified false ho        →  "Payment not verified."
 *   warna                             →  "Ready to checkout."
 *
 * ✋ TARTEEB bilkul yehi rakhni hai. Agar cart hi khaali hai to address poochna fuzool hai.
 * ✋ Nested `if` MAT likhna. Char alag lines — teen guard, phir aakhri jawab.
 * ✋ Address pe `.trim()` yaad rakhna (C2 wala hi jaal hai).
 * ✋ `if (isPaymentVerified === false)` ke bajaye `!isPaymentVerified` likho — chhota aur saaf.
 */
export function canCheckout(
  itemCount: number,
  address: string,
  isPaymentVerified: boolean,
): string {
  if (itemCount === 0) return "Cart is empty.";
  if (address.trim() === "") return "Address is required.";
  if (!isPaymentVerified) return "Payment not verified.";
  
  return "Ready to checkout.";
}
