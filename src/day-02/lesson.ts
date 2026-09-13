/**
 * DAY 02 — REFERENCE SOLUTION (ek dafa parho, phir band kar do)
 *
 * DHYAN DO: aap ke paas shipping rules hain. Mere paas bijli ka tariff.
 * Shakal bilkul wohi hai, cheezein alag — taake aap copy-paste na kar sako.
 */

// ─────────────────────────────────────────────────────────────────────────────
// PART A — if / else if : TARTEEB HI LOGIC HAI
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Units ke hisab se consumption band.
 *
 *   minimal    : 50 se kam
 *   normal     : 50 se 299zl
 *   high       : 300 se 699
 *   commercial : 700 aur us se upar
 *
 * ★ Sab se ahem cheez: TARTEEB.
 *
 * Maine sab se CHHOTI shart pehle likhi hai. Agar main ulta likhta:
 *
 *   if (units < 700) return "high";      // 20 units bhi yahin phans jate
 *   if (units < 300) return "normal";    // yahan kabhi pohanchte hi nahi
 *
 * ...to 20 units wala ghar bhi "high" ban jata. `units < 700` us ke liye bhi
 * sach hai! JavaScript PEHLI sachi shart pe ruk jati hai, baqi dekhti hi nahi.
 *
 * Aur gaur karo: har `if` ke baad `else` nahi hai. Zaroorat hi nahi —
 * `return` function wahin khatam kar deta hai. Ye kal wala guard clause hi hai.
 */
export function usageBand(units: number): string {
  if (units < 50) return "minimal";
  if (units < 300) return "normal";
  if (units < 700) return "high";
  return "commercial";
}

// ─────────────────────────────────────────────────────────────────────────────
// PART B — switch : jab EK cheez ki EXACT value match karni ho
// ─────────────────────────────────────────────────────────────────────────────

/**
 * City code se region.
 *
 * Do cheezein dekho:
 *
 * 1. GROUPED CASES — "LHE", "ISB", "RWP" teeno bagair kisi code ke ek doosre ke
 *    upar likhe hain. Jab `case` ke baad kuch na ho, control neeche BEH jata hai
 *    (fallthrough). Jaan boojh kar aisa karna bilkul theek hai aur bohot saaf lagta hai.
 *
 * 2. `break` KAHIN NAHI HAI — kyunke maine seedha `return` likha hai.
 *    `return` poora function khatam kar deta hai, is liye ghalti se neeche behne
 *    ka koi imkan hi nahi bachta. `switch` mein `return` hamesha `break` se mehfooz hai.
 *
 * 3. `default` HAMESHA likho. Kal ko koi naya city code aa gaya to code crash
 *    nahi karega — ek saaf, mutawaqqe jawab dega.
 */
export function regionFor(cityCode: string): string {
  switch (cityCode) {
    case "KHI":
      return "south";
    case "LHE":
    case "ISB":
    case "RWP":
      return "north";
    case "QTA":
    case "PEW":
      return "west";
    default:
      return "unknown";
  }
}

/**
 * Har region ka per-unit tariff.
 *
 * Ye alag function kyun hai, seedha upar wale mein kyun nahi milaya?
 * Kyunke ye DO alag sawal hain:
 *   - "ye sheher kis region mein hai?"  (jugrafiya)
 *   - "is region ka rate kya hai?"      (paisa)
 *
 * Kal rate badlega lekin jugrafiya nahi. Do alag wajah se badalne wali cheezon
 * ko alag functions mein rakhna — ye aage SOLID ka "S" ban jayega.
 */
export function regionTariff(region: string): number {
  switch (region) {
    case "south":
      return 18;
    case "north":
      return 22;
    case "west":
      return 15;
    default:
      return 0;
  }
}

export function bandSurcharge(band: string): number {
  switch (band) {
    case "minimal":
      return 1;
    case "normal":
      return 2;
    case "high":
      return 3;
    default:
      return 5;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PART C — logical operators aur truthy/falsy
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Subsidy milti hai agar ghar lifeline connection pe hai YA 100 units se kam use kiye.
 *
 * Shart ko zabaan mein bolo: "lifeline hai YA units 100 se kam hain."
 * "YA" suna? To `||`.
 *
 * Aur dekho maine ye NAHI likha:
 *
 *   if (isLifeline || units <= 100) { return true; } else { return false; }
 *
 * Kyunke `isLifeline || units <= 100` KHUD HI pehle se true ya false hai.
 * (Kal ka sabaq — comparison ka natija seedha return karo.)
 */
export function hasSubsidy(units: number, isLifeline: boolean): boolean {
  return isLifeline || units <= 100;
}

/**
 * Meter code saaf kar ke wapas. Agar khaali ho to "UNREGISTERED".
 *
 * ★ YAHAN WO JAAL HAI JISMEIN ZYADATAR LOG PHANSTE HAIN ★
 *
 * Bohot log ye likhte hain:
 *
 *   if (!code) return "UNREGISTERED";    // ❌ NAAKAAFI
 *
 * Ye sirf "" (bilkul khaali string) pakarta hai. Lekin `"   "` — jisme sirf
 * spaces hain — JavaScript mein TRUTHY hai! Non-empty string jo hai.
 * User ne space bar daba diya, aur aap ka check chup chaap nikal gaya.
 *
 * Ilaj: pehle `.trim()` karo, PHIR check karo.
 *
 * Aur gaur karo maine `trimmed` ek dafa bana kar dono jagah use kiya — `code.trim()`
 * do dafa likhna sirf duplication hai.
 */
export function meterLabel(code: string): string {
  const trimmed = code.trim();
  if (trimmed === "") return "UNREGISTERED";
  return trimmed;
}

// ─────────────────────────────────────────────────────────────────────────────
// PART D — composition aur guard clauses
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Mahine ka bill.
 *
 * Dobara wohi baat jo kal thi: yahan koi NAYA hisab nahi hai.
 * Maine sirf upar wale chaar functions ko tarteeb se jorra hai.
 *
 * Bahaav dekho:
 *
 *   cityCode ──► regionFor()  ──► region ──► regionTariff()  ──► tariff
 *   units    ──► usageBand()  ──► band   ──► bandSurcharge() ──► surcharge
 *                                                                   │
 *                                        tariff × surcharge ────────┘
 *
 * Do alag zanjeerein, aakhir mein ek jagah milti hain.
 */
export function monthlyBill(units: number, cityCode: string): number {
  const region = regionFor(cityCode);
  const band = usageBand(units);

  return regionTariff(region) * bandSurcharge(band);
}

/**
 * ★ AAJ KA ASAL SABAQ — GUARD CLAUSES ★
 *
 * Ye function nested `if` ke sath aise dikhta (aur bohot codebases mein aisa hi hai):
 *
 *   if (readingCount > 0) {
 *     if (meterCode.trim() !== "") {
 *       if (isVerified) {
 *         return "Ready to generate bill.";
 *       } else {
 *         return "Meter not verified.";
 *       }
 *     } else {
 *       return "Meter code is required.";
 *     }
 *   } else {
 *     return "No meter readings found.";
 *   }
 *
 * Ab neeche wala version dekho. Bilkul wohi kaam, lekin:
 *
 *   - Har line ek mukammal soch hai: "ye galat hai? nikal jao." Agla. Agla.
 *   - Parhne wale ko dimagh mein kuch yaad nahi rakhna parta. Nested wale mein
 *     yaad rakhna parta hai ke "main abhi 3 if ke andar hoon aur 2 else neeche hain."
 *   - Asal jawab AAKHIR MEIN, bina kisi indentation ke, akela khara hai.
 *   - Nayi shart lagani ho to ek line barhao. Nested wale mein poora dhancha cherna parta.
 *
 * Aur yahan bhi TARTEEB logic hai: agar cart khaali hai to address poochna hi
 * fuzool hai. Sab se buniyadi galti sab se pehle pakro.
 */
export function canGenerateBill(
  readingCount: number,
  meterCode: string,
  isVerified: boolean,
): string {
  if (readingCount === 0) return "No meter readings found.";
  if (meterCode.trim() === "") return "Meter code is required.";
  if (!isVerified) return "Meter not verified.";

  return "Ready to generate bill.";
}
