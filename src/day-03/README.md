# Day 03 — Arrays aur Loops

Ab tak aap ne **ek** cheez pe kaam kiya — ek number, ek naam, ek order.
Aaj se **bohot si** cheezein ek sath aa rahi hain.

Aaj ka senior principle:

> **Loop likhne se PEHLE poocho: main gin raha hoon, chaan raha hoon, ya badal raha hoon?**
> Teeno ka apna shakal hai. Jo pehchan le, uska loop kabhi ulajhta nahi.

---

## 1. Array hai kya

Array = cheezon ki **tarteeb wali list**. Ek hi type ki cheezein, ek line mein.

```ts
const marks: number[] = [80, 45, 92, 33];
const names: string[] = ["Usama", "Ali"];
const present: boolean[] = [true, true, false];
```

`number[]` parho aise: **"numbers ka array"**.

### Index — ginti 0 se shuru hoti hai

```ts
const marks = [80, 45, 92, 33];
//              0   1   2   3     ← ye index hain

marks[0]   // 80   ← PEHLA element index 0 pe hai, 1 pe nahi
marks[3]   // 33   ← AAKHRI element index 3 pe hai
marks.length  // 4
```

> **Sab se aam bug:** aakhri element ka index `length` nahi, **`length - 1`** hota hai.
> 4 cheezein hain, lekin aakhri index 3 hai. Ye ginti se ek kam wala rishta zindagi bhar
> yaad rakhna parta hai — isay "off-by-one error" kehte hain aur ye programming ka
> sab se mashhoor bug hai.

---

## 2. ★ Ek cheez jo aap ko aaj HAIRAN karegi ★

Ye likh kar dekho:

```ts
const marks: number[] = [80, 45, 92];
const first = marks[0];

const doubled = first * 2;
//              ^^^^^  Error: 'first' is possibly 'undefined'.
```

**"Bhai, 80 to saaf nazar aa raha hai! Undefined kahan se aaya?"**

Ye hamare `tsconfig.json` ki ek setting hai: **`noUncheckedIndexedAccess: true`**.

Wajah samjho:

```ts
marks[0]    // 80
marks[99]   // undefined   ← JavaScript crash nahi karti, chup chaap undefined deti hai!
```

TypeScript ko ye nahi pata ke aap ne `0` likha hai ya `99`. Uske liye `marks[koi_bhi_index]`
ka jawab **"number ya undefined"** hai — kyunke wo index list se bahar bhi ho sakta hai.

Zyadatar projects mein ye setting **band** hoti hai, aur phir yeh hota hai:

```ts
const user = users[5];        // TS kehta hai: "ye User hai" (jhoot)
console.log(user.name);       // 💥 runtime crash: Cannot read properties of undefined
```

Hamare project mein ye setting **khuli** hai, is liye TypeScript pehle hi rok deta hai.
Shuru mein takleef degi — lekin ye aap ko crash se bacha rahi hai.

### Is se bachne ka sab se saaf tareeqa: `for...of`

Aur yahan asal khoobsurti hai — **`for...of` mein ye masla hota hi nahi:**

```ts
for (const mark of marks) {
  const doubled = mark * 2;   // ✅ koi error nahi! `mark` pakka `number` hai
}
```

Kyun? Kyunke `for...of` **index se cheez nikalti hi nahi** — wo seedha har element pe
chalti hai. Aur jo element wahan maujood hai, wo yaqeeni tor pe maujood hai.

> **Isi liye aaj ka default `for...of` hai.** Index wala loop sirf tab jab aap ko
> waqai index ki value chahiye ho.

---

## 3. `for...of` — aaj ka default

```ts
const marks = [80, 45, 92];

for (const mark of marks) {
  // har chakkar mein `mark` agle element ki value hai
  // pehla chakkar: 80,  doosra: 45,  teesra: 92
}
```

Parho aise: **"marks ke andar har `mark` ke liye..."**

`const` use karo, `let` nahi — har chakkar mein naya `mark` banta hai, purana badalta nahi.

---

## 4. Classic `for` — jab index ki zaroorat ho

```ts
for (let i = 0; i < marks.length; i++) {
  //   ①        ②                 ③
}
```

- ① **shuru:** `i` ko 0 se shuru karo (pehla index)
- ② **shart:** jab tak `i` length se **kam** hai, chalte raho
- ③ **har chakkar ke baad:** `i` ek barhao

**Yahan `<` hi likhna hai, `<=` nahi.** `marks.length` 4 hai lekin aakhri index 3 hai.
`<=` likha to `marks[4]` chala jayega — `undefined` — aur wohi off-by-one bug ban jayega.

Ye loop sirf tab likho jab aap ko **index ki value** chahiye ho (jaise "kaunse number pe
pehla fail aaya?"). Warna `for...of`.

---

## 5. Accumulator pattern — aur aaj `let` ki ijazat hai

Do din se `let` mana tha. **Aaj wo pehli jagah aa gayi jahan `let` waqai theek hai:**

```ts
function totalMarks(marks: readonly number[]): number {
  let total = 0;                  // ← yahan `let` bilkul sahi hai

  for (const mark of marks) {
    total = total + mark;         // ya chhota likho: total += mark;
  }

  return total;
}
```

`total` ko **badalna hi to hai** — har chakkar mein. Ye `let` ka asal maqsad hai.

> **`let` ka qanoon:** `let` tab likho jab value ka **badalna hi uska kaam ho**
> (jaise jama karna, ginti karna). Jab aap sirf "abhi decide nahi kiya" ki wajah se
> `let` likh rahe ho — wo galat hai.

Teen aam accumulator shapes — ye teeno yaad kar lo:

```ts
// GINNA (sum)
let total = 0;
for (const x of list) total += x;

// GINTI (count with condition)
let count = 0;
for (const x of list) {
  if (x >= 50) count++;         // count++ ka matlab: count = count + 1
}

// SAB SE BARA (max)
let best = 0;
for (const x of list) {
  if (x > best) best = x;
}
```

---

## 6. Naya array banana

```ts
function gradesFor(marks: readonly number[]): string[] {
  const grades: string[] = [];        // khaali array banaya

  for (const mark of marks) {
    grades.push(gradeFor(mark));      // `push` aakhir mein ek cheez laga deta hai
  }

  return grades;
}
```

**"Ruko — `push` to mutation hai! Aap ne mana kiya tha!"**

Achi nazar. Farq ye hai:

```ts
// ✅ THEEK — apna banaya hua LOCAL array badal rahe ho
const grades: string[] = [];
grades.push("A");

// ❌ GALAT — CALLER ka array badal rahe ho
function addGrade(marks: number[]): void {
  marks.push(99);       // caller ka array chup chaap badal diya!
}
```

> **Qanoon: jo array aap ne khud is function ke andar banaya, usay jitna chaho badlo.
> Jo array bahar se aaya hai, usay kabhi mat chherna.**

Doosri baat is ki khilaf-warzi ko "side effect" kehte hain, aur wo Day 01 wale
**pure function** ke usool ko torta hai. Caller ne aap ko list *dekhne* ko di thi,
*badalne* ko nahi.

### `readonly number[]` — is qanoon ko compiler se manwana

Gaur karo maine parameters pe `readonly number[]` likha hai, sirf `number[]` nahi:

```ts
function totalMarks(marks: readonly number[]): number {
  marks.push(10);
  //    ^^^^ Error: Property 'push' does not exist on type 'readonly number[]'.
}
```

**`readonly` likhne se compiler khud aap ka haath rok deta hai.**
Ye sirf aap ke liye nahi — parhne wale ke liye bhi waada hai: "ye function aap ki list ko
sirf parhega, badlega nahi." Aaj har array parameter pe `readonly` lagana hai.

---

## 7. Khaali array — hamesha pehle socho

```ts
function averageMarks(marks: readonly number[]): number {
  return totalMarks(marks) / marks.length;   // ❌ khaali list pe 0/0 = NaN
}
```

`NaN` ("Not a Number") chup chaap poore system mein pheil jata hai —
`NaN + 5` bhi `NaN` hai. Aur report mein "NaN%" chhap jata hai.

Ilaj wohi Day 02 wala **guard clause** hai:

```ts
function averageMarks(marks: readonly number[]): number {
  if (marks.length === 0) return 0;        // ← darban

  return Math.round(totalMarks(marks) / marks.length);
}
```

> **Har us function mein jahan aap `length` se taqseem kar rahe ho, khaali list ka
> guard sab se pehli line hona chahiye.**

---

## Aaj ke tasks

Domain: **student marks register** — school/LMS system ka asal code.

[practice.ts](practice.ts) kholo, 8 functions.

### Part A — accumulator
- **A1** `totalMarks(marks)` — sab jama
- **A2** `averageMarks(marks)` — A1 reuse karo, khaali pe 0, `Math.round`
- **A3** `highestMark(marks)` — sab se bara (bina `Math.max`), khaali pe 0

### Part B — ginti aur talash
- **B1** `countPassing(marks, passMark)` — kitne pass hue
- **B2** `firstFailingIndex(marks, passMark)` — pehle fail ka **index**, koi na ho to `-1`

### Part C — badalna (transform)
- **C1** `gradeFor(mark)` — ek number se grade (Day 02 wali if/else chain)
- **C2** `gradesFor(marks)` — poori list ke grades, **C1 reuse karo**

### Part D
- **D1** `attendancePercent(days)` — `boolean[]` se hazri ka percentage

## Aaj ke rules

- ✅ **`let` ki ijazat hai** — lekin **sirf accumulator ke liye** (`total`, `count`, `best`).
- ✋ Har array parameter pe **`readonly`** lagao.
- ✋ Bahar se aayi list ko **kabhi mat badlo** — na `push`, na `sort`, na kuch.
- ✋ **`for...of` default hai.** Classic `for` sirf B2 mein (wahan index chahiye).
- ✋ Jahan `length` se taqseem ho, **khaali ka guard pehli line**.
- ✋ `==` nahi, `===`. `return` ke baad `else` nahi. (purane rules chalte rahenge)
- ✋ C2 mein grade ka hisab **dobara mat likhna** — C1 call karo.

## Chalao

```bash
npm run test:watch
```

Shuru mein **24 tests fail** honge.
