/**
 * DAY 03 — YE AAP KI FILE HAI.
 *
 * Domain: student marks register.
 *
 * Rules:
 *   - `let` ki IJAZAT hai — lekin sirf accumulator ke liye (total, count, best).
 *   - Har array parameter pe `readonly`.
 *   - Bahar se aayi list kabhi mat badlo (na push, na sort).
 *   - `for...of` default hai. Classic `for` sirf B2 mein.
 *   - Jahan `length` se taqseem ho, khaali ka guard PEHLI line.
 *   - `==` nahi, `===`. `return` ke baad `else` nahi.
 *
 * Chalao:  npm run test:watch
 */

// ─────────────────────────────────────────────────────────────────────────────
// PART A — ACCUMULATOR
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TODO A1: saare marks jama karo.
 *   
 *   totalMarks([80, 45, 92])  →  217
 *   totalMarks([])            →  0
 *
 * Accumulator ke teen hisse:
 *   1. loop se PEHLE  — `let total = 0`
 *   2. loop ke ANDAR  — har chakkar mein barhao
 *   3. loop ke BAAD   — return
 *
 * ✋ `for...of` use karo — `marks[i]` likhne ki zaroorat hi nahi.
 */
// export function totalMarks(marks: readonly number[]): number {
//   // throw new Error("TODO A1: totalMarks");
// }
export function totalMarks(marks: readonly number[]): number {

  if (marks.length === 0) return 0;  // guard that check if ) marks return 0;

  let total=0;
 
  for(const mark of marks){
    total+=mark;
  }
  return total;
}

/**
 * 
 * sum of n/ No of n
 * // sum element/lenght of elements
 * TODO A2: average marks, poore number mein (`Math.round`).
 *
 *   averageMarks([80, 45, 92])  →  72      (217 / 3 = 72.33 → round)
 *   averageMarks([50, 50])      →  50
 *   averageMarks([])            →  0       ← guard!
 *
 * ✋ Jama karne ka hisab DOBARA mat likhna — A1 call karo.
 * ✋ Khaali list ka guard PEHLI line pe. Warna `0 / 0` = `NaN`.
 */
// export function averageMarks(marks: readonly number[]): number {
//   throw new Error("TODO A2: averageMarks");
// }

export function averageMarks(marks: readonly number[]): number {
 
  if (marks.length === 0) return 0; 
   const total= totalMarks(marks);
   return   Math.round(total/marks.length);
}

/**
 * TODO A3: sab se zyada marks.
 * [80,45,92] 
 *   highestMark([80, 45, 92])  →  92
 *   highestMark([10])          →  10
 *   highestMark([])            →  0
 *
 * ✋ `Math.max` use nahi karna. Loop se khud socho —
 *    "abhi tak ka sab se bara" ek `let` mein rakho, har element se compare karo.
 */
// export function highestMark(marks: readonly number[]): number {
//   throw new Error("TODO A3: highestMark");
// }

export function highestMark(marks: readonly number[]): number {

   if (marks.length===0) return 0;
   
   let max=0;  // lets suppose abhi max marks 0 han
   for(const mark of marks){
      if (mark>max) max=mark; 
   }
    return max;
}

// ─────────────────────────────────────────────────────────────────────────────
// PART B — GINTI aur TALASH
// ─────────────────────────────────────────────────────────────────────────────

/**
 * (marks[] , passingmarks);
 * TODO B1: kitne students pass hue (marks `passMark` ya us se zyada).
 *
 *   countPassing([80, 45, 92, 33], 40)  →  3
 *   countPassing([40, 40], 40)          →  2      ← boundary! theek 40 bhi pass
 *   countPassing([], 40)                →  0
 *
 * ✋ Ye bhi accumulator hai — bas value ke bajaye GINTI jama ho rahi hai.
 *    `count++` ka matlab `count = count + 1`.
 */
// export function countPassing(marks: readonly number[], passMark: number): number {
//   throw new Error("TODO B1: countPassing");
// }

export function countPassing(marks: readonly number[], passingMarks: number): number {
 
  if (marks.length===0 && passingMarks) return 0; 
  
  let count =0;
  for(const mark of marks) {

    if (mark>=passingMarks) count++;
  }  
  return count;
}

/**
 * TODO B2: pehla fail hone wala mark kis jagah (index) pe hai.
 * Agar koi fail na ho to `-1`.
 *
 *   firstFailingIndex([80, 45, 30, 20], 40)  →  2      ← 30 index 2 pe hai
 *   firstFailingIndex([10, 80], 40)          →  0      ← pehla hi fail
 *   firstFailingIndex([80, 90], 40)          →  -1     ← koi fail nahi
 *   firstFailingIndex([], 40)                →  -1
 *
 * ✋ ★ YAHI WO IKLAUTA TASK HAI JAHAN CLASSIC `for` CHAHIYE ★
 *    Kyunke humein value nahi, uski JAGAH chahiye. `for...of` jagah nahi deta.
 *
 * ✋ `i < marks.length` likhna hai, `<=` nahi. (off-by-one!)
 * ✋ Jaise hi mil jaye, foran `return i` — aage dhoondne ka faida nahi.
 * ✋ `-1` kyun? Ye JavaScript ka rivaj hai: "mila hi nahi". `0` nahi de sakte
 *    kyunke `0` khud ek asli index hai.
 */
export function firstFailingIndex(marks: readonly number[], passMark: number): number {
  // throw new Error("TODO B2: firstFailingIndex");
  if (marks.length===0)  return -1; 
 for (let i = 0; i < marks.length; i++) {
  const item = marks[i];
    if (item!== undefined && item <passMark) return i;
 }
 return -1;

}

// ─────────────────────────────────────────────────────────────────────────────
// PART C — BADALNA (transform)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TODO C1: ek mark se grade.
 *
 *   80 ya zyada  →  "A"
 *   65 se 79     →  "B"
 *   50 se 64     →  "C"
 *   40 se 49     →  "D"
 *   40 se kam    →  "F"
 *
 *   gradeFor(95)  →  "A"
 *   gradeFor(80)  →  "A"     ← boundary
 *   gradeFor(40)  →  "D"     ← boundary
 *   gradeFor(39)  →  "F"
 *
 * ✋ Day 02 wali if chain — sab se KHAAS shart sab se UPAR.
 *    Agar `mark >= 40` pehle likh diya to 95 bhi "D" ban jayega.
 * ✋ `else` mat likhna.
 */
export function gradeFor(mark: number): string {  // for only single single score
  // 
  if (mark<40) return "F";
  if (mark<50) return "D";
  if (mark<65) return "C";
  if (mark<80) return "B";
   return "A";
 }

/**
 * TODO C2: poori list ke grades — ek NAYI list mein.
 *
 *   gradesFor([95, 70, 55, 42, 10])  →  ["A", "B", "C", "D", "F"]
 *   gradesFor([])                    →  []
 *
 * ✋ Grade ka hisab DOBARA mat likhna — C1 call karo.
 * ✋ Khaali array bana kar `push` karo. Ye theek hai kyunke wo array AAP ne
 *    is function ke andar banaya hai. `marks.push(...)` galat hota — wo caller ka hai.
 */
export function gradesFor(marks: readonly number[]): string[] {
 const gradeList: string[]= [];  // list of grade type string as array

  if (marks.length === 0) return gradeList;

  // har ik items ko iterate krke usse emply gradelist me dalena ha 
  // hamre pas ik fucntion h gradeFor jo ka string string krta h for grade 

    for(const mark of marks){
        gradeList.push(gradeFor(mark));
    }
     
    return gradeList;
}

// ─────────────────────────────────────────────────────────────────────────────
// PART D — boolean list
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TODO D1: hazri ka percentage. `true` = present, `false` = absent.
 *
 *   attendancePercent([true, true, true, false])  →  75
 *   attendancePercent([true, false, false])       →  33     (1/3 = 33.33 → round)
 *   attendancePercent([false, false])             →  0
 *   attendancePercent([])                         →  0      ← guard!
 *
 * ✋ `if (day === true)` MAT likhna — `day` khud hi boolean hai. Seedha `if (day)`.
 * ✋ Guard pehli line pe (neeche `length` se taqseem hogi).
 */
export function attendancePercent(days: readonly boolean[]): number {
  // throw new Error("TODO D1: attendancePercent");
  //  how to calculate % of attendence =  no of present days/days total * 100
  if(days.length===0) return 0;
  let presentCount=0;  // accumulator
  for(const day of days){
  
     if (day) presentCount++;
  }
   
     return Math.round(presentCount/days.length * 100);
}
