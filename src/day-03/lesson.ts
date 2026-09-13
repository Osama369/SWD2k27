/**
 * DAY 03 — REFERENCE SOLUTION (ek dafa parho, phir band kar do)
 *
 * DHYAN DO: aap ke paas student marks hain. Mere paas cricket scores.
 * Shakal bilkul wohi hai — taake aap copy-paste na kar sako.
 */

// ─────────────────────────────────────────────────────────────────────────────
// PART A — ACCUMULATOR: ek `let`, ek loop, ek jawab
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Poori series ke runs jama.
 *
 * Ye "accumulator pattern" hai, aur ye teen hisson ka hota hai:
 *
 *   1. loop se PEHLE  — jama karne wali cheez banao, khaali haalat mein (`0`)
 *   2. loop ke ANDAR  — har chakkar mein usay barhao
 *   3. loop ke BAAD   — usay return karo
 *
 * ★ Yahan `let` bilkul sahi hai. Do din se maine `let` mana kiya tha —
 *   ye pehli jagah hai jahan wo waqai zaroori hai, kyunke `total` ka kaam hi
 *   badalna hai. Jab badalna hi maqsad ho, `let` sahi hai.
 *
 * ★ Aur `for...of` gaur karo — maine `scores[i]` kahin nahi likha.
 *   `for...of` seedha element deta hai, is liye `score` pakka `number` hai,
 *   `number | undefined` nahi. Poora masla hi paida nahi hota.
 *
 * ★ Parameter pe `readonly` dekho. Ye compiler se kehta hai: "main is list ko
 *   sirf parhunga." Agar main galti se `scores.push(...)` likh doon to error aayega.
 */
export function totalRuns(scores: readonly number[]): number {
  let total = 0;  // this is accumulator
  //  for of loop
  for (const score of scores) {    // scors[10,15,6]
    total += score; // `total = total + score` ka chhota roop
  }

  return total;
}

/**
 * Average runs.
 *
 * ★ Pehli line hi guard hai. Agar ye na hoti to khaali list pe `0 / 0` hota,
 *   jiska jawab `NaN` hai — aur `NaN` chup chaap poore system mein pheil jata hai
 *   (`NaN + 5` bhi `NaN` hai). Report mein "NaN runs" chhap jata aur koi na samajhta
 *   ke kahan se aaya.
 *
 * ★ Aur dekho: maine jama karne ka hisab DOBARA nahi likha. `totalRuns` pehle se
 *   maujood hai aur tested hai — usay call kiya. Yehi kal wali composition hai.
 */
export function averageRuns(scores: readonly number[]): number {
  if (scores.length === 0) return 0;  // age [0]
   // avg formula =  sum of N / no of elemements means lenght of elements  
  return Math.round(totalRuns(scores) / scores.length);
}

/**
 * Sab se bara score — bina `Math.max` ke.
 * 
 *  // [10,6,19]   sab se zaida ya bara score 
 *
 * Wohi teen hisse: `best` banao, loop mein muqabla karo, aakhir mein return.
 *
 * Har chakkar mein sirf DO cheezein compare ho rahi hain: "jo abhi tak ka sab se
 * bara hai" aur "jo abhi haath mein aaya". Ye soch aage sorting algorithms tak
 * chalti hai — ek dafa mein sirf do cheezein.
 */
export function bestScore(scores: readonly number[]): number {
  let best = 0; 
  // [10,6,19] 
  
  for (const score of scores) {
    if (score > best) best = score;
  }

  return best;
}

// ─────────────────────────────────────────────────────────────────────────────
// PART B — GINTI aur TALASH
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Kitni innings mein `threshold` ya us se zyada runs bane.
 *
 * Ye bhi accumulator hai — bas is dafa hum VALUE jama nahi kar rahe, GINTI kar rahe hain.
 * `count++` ka matlab hai `count = count + 1`.
 *
 * Gaur karo `if` ke andar koi `else` nahi hai. Zaroorat hi nahi — agar shart jhoot hai
 * to kuch karna hi nahi, loop khud agle chakkar pe chala jayega.
 */
export function countFifties(scores: readonly number[], threshold: number): number {
  let count = 0;
  // scores[33,50,90,30]
  for (const score of scores) {
    if (score >= threshold) count++;
  }

  return count;  // 2 
}

/**
 * Pehli duck (0 runs) kis inning mein aayi — uska INDEX.
 * Koi duck na ho to -1.
 *
 * ★ YE WO IKLAUTI JAGAH HAI JAHAN CLASSIC `for` CHAHIYE.
 *
 * Kyun? Kyunke yahan humein sirf VALUE nahi chahiye — humein ye chahiye ke wo
 * KAHAN thi. `for...of` humein sirf value deta hai, jagah nahi. Is liye yahan
 * index wala loop hi sahi hai.
 *
 * ★ `i < scores.length` — `<` hi likha hai, `<=` nahi.
 *   3 scores hain to indexes 0, 1, 2 hain. `<=` likhte to `scores[3]` bhi
 *   chala jata, jo maujood hi nahi. Yehi mashhoor "off-by-one" bug hai.
 *
 * ★ Aur dekho: jaise hi mil gaya, foran `return i`. Aage dhoondne ka koi
 *   faida nahi — humein PEHLI chahiye thi. Ye bhi ek guard clause hi hai.
 *
 * ★ -1 kyun? Ye JavaScript ka apna rivaj hai (`indexOf` bhi -1 deta hai):
 *   "mila hi nahi". 0 nahi de sakte kyunke 0 to ek asli index hai.
 */
// [10, 0 , 40, 33 , 50]  // kis ing me 0 score aya 
export function firstDuckIndex(scores: readonly number[]): number {
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] === 0) return i;
  }

  return -1;
}

// ─────────────────────────────────────────────────────────────────────────────
// PART C — BADALNA (transform): ek list se doosri list
// ─────────────────────────────────────────────────────────────────────────────

/**x`
 * Ek score ki rating.
 *
 * Ye bilkul Day 02 wali `if` chain hai — sab se KHAAS shart sab se upar.
 * Agar `score >= 20` pehle likh dete to 150 runs bhi "decent" ban jate.
 */
export function ratingFor(score: number): string {
  if (score >= 100) return "century";
  if (score >= 50) return "fifty";
  if (score >= 20) return "decent";
  return "poor";
}

/**
 * Poori list ki ratings.
 *
 * ★ Ye aaj ka teesra shape hai: "badalna". Andar aane wali list ka har element
 *   ek nayi cheez mein badal kar, ek NAYI list banti hai.
 *   Andar wali list ko haath tak nahi lagaya.
 *
 * ★ `push` yahan bilkul theek hai — kyunke `ratings` maine KHUD is function ke
 *   andar banaya hai. Ye local hai, kisi aur ka nahi. Agar main `scores.push(...)`
 *   likhta to wo galat hota — wo caller ka array hai.
 *
 * ★ Aur rating ka hisab maine dobara nahi likha — `ratingFor` call kiya.
 *   Kal rating bands badle to sirf EK jagah badlegi.
 *
 * (Day 05 pe ye poora loop sirf ek line ban jayega: `scores.map(ratingFor)`.
 *  Lekin pehle haath se likhna zaroori hai — warna `map` jadoo lagta hai, tool nahi.)
 */
// [100,85,65,70,40]  array of scors ya list of scores
export function ratingsFor(scores: readonly number[]): string[] {
  const ratings: string[] = []; // empty array of ratings

  for (const score of scores) { // loop over array of scores
    ratings.push(ratingFor(score));  // ratingFor function return only for single score rating
  }

  return ratings;  //["century",fifty,fifty,fifty,decent]
}

// ─────────────────────────────────────────────────────────────────────────────
// PART D — boolean list
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Kitne percent match jeete.
 *
 * ★ `boolean[]` pe loop bilkul waise hi chalta hai jaise `number[]` pe.
 *
 * ★ Aur dekho maine `if (won === true)` NAHI likha. `won` khud hi boolean hai —
 *   usay dobara `true` se compare karna fuzool hai. Seedha `if (won)`.
 *   (Wohi baat jo Day 02 mein `!isPaymentVerified` pe hui thi.)
 *
 * ★ Guard pehli line pe hai — kyunke neeche `results.length` se taqseem ho rahi hai.
 */
// [] --> 0 percentage
// [true,false,true,false,true,false] = 3 jeete  count
export function winPercent(results: readonly boolean[]): number {
  if (results.length === 0) return 0;

  let wins = 0;  // accumulator 

  for (const won of results) {
    if (won) wins++;
  }
   
  // part/whole *100  =  wins/results.lenght * 100
  return Math.round((wins / results.length) * 100);
}
