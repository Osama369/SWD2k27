# Day 02 — Control Flow: Faisle Kaise Liye Jate Hain

Kal aap ne seekha ke ek function **ek jawab** kaise banata hai.
Aaj seekhenge ke function **kai raston mein se ek** kaise chunta hai.

Aaj ka senior principle:

> **Nesting ek smell hai. Code ko flat rakho.**

---

## 1. `if` / `else if` / `else` — aur tarteeb ka masla

```ts
if (shart1) {
  // shart1 sach hai
} else if (shart2) {
  // shart1 jhoot, shart2 sach
} else {
  // koi bhi sach nahi
}
```

Ek baat jo bohot log nahi jante:

> **`else if` ki chain mein tarteeb khud ek logic hai.**
> JavaScript upar se neeche chalti hai aur **pehli** sachi shart pe ruk jati hai.
> Baqi saari shartein — chahe wo bhi sachi hon — kabhi dekhi hi nahi jatin.

Ye dekho — ek classic bug:

```ts
// ❌ GALAT
function grade(marks: number): string {
  if (marks >= 40) return "Pass";
  if (marks >= 80) return "Distinction";   // yahan kabhi pohanch hi nahi sakte
  return "Fail";
}

grade(95);   // "Pass"  ← 95 marks pe bhi sirf "Pass"?!
```

`95 >= 40` pehle hi sach ho gaya, function wahin khatam. Doosri line **mara hua code** hai —
aur compiler kuch nahi kehta, tests bhi shayad na pakden.

```ts
// ✅ SAHI — sab se tang shart pehle
function grade(marks: number): string {
  if (marks >= 80) return "Distinction";
  if (marks >= 40) return "Pass";
  return "Fail";
}
```

**Qanoon: `else if` chain mein sab se KHAAS (narrow) shart sab se upar, sab se AAM (broad)
sab se neeche.** Aaj ka task A1 bilkul yehi cheez test karta hai — dhyan se.

---

## 2. Comparison operators

| Operator | Matlab |
|---|---|
| `===` | barabar hai (type bhi, value bhi) |
| `!==` | barabar nahi |
| `>` `<` | bara / chhota |
| `>=` `<=` | bara ya barabar / chhota ya barabar |

Aur ek dafa phir, kyunke ye aap ki kal wali cheez thi:

```ts
0 == ""            // true   😱  types badal diye  // 0 === ""  false
0 == false         // true   😱
null == undefined  // true   😱

0 === ""           // false  ✅  jaisa hona chahiye
```

**`==` kabhi nahi. Hamesha `===`.** Koi exception nahi.

---

## 3. Logical operators: `&&`, `||`, `!`

```ts
a && b    // AUR  — dono sach hon
a || b    // YA   — koi ek sach ho
!a        // ULTA — sach ko jhoot, jhoot ko sach
```

Confusion ka ilaj wohi hai jo maine kal bataya tha: **shart ko zabaan mein bol kar dekho.**
"AUR" suno to `&&`. "YA" suno to `||`.

### Short-circuit — ek cheez jo bohot kaam aati hai

JavaScript jaise hi jawab jaan leti hai, aage parhna **band** kar deti hai:

```ts
false && kuchBhi()    // kuchBhi() CHALTA HI NAHI — `false &&` ka jawab hamesha false hai
true  || kuchBhi()    // kuchBhi() CHALTA HI NAHI — `true ||` ka jawab hamesha true hai
```

Ye sirf raftaar ki baat nahi — hifazat ki baat hai. Aage jab objects aayenge to aap likhoge
`user && user.name`, aur `&&` hi aap ko crash se bachayega.

---

## 4. Truthy aur Falsy — ye zaroor yaad karo

JavaScript mein jab koi cheez `if` ke andar aati hai, to wo `true`/`false` mein badal di jati hai.

**Sirf ye 6 cheezein FALSY hain** (yani `false` jaisi behave karti hain):

```
false      0      ""      null      undefined      NaN
```

**Baqi SAB truthy hai.** Aur yahan wo cheezein hain jo log ghalat samajhte hain:

```ts
if ("0")    { }   // ✅ CHALEGA  — "0" ek non-empty string hai!
if ([])     { }   // ✅ CHALEGA  — khaali array bhi truthy hai
if ({})     { }   // ✅ CHALEGA  — khaali object bhi truthy hai
if (" ")    { }   // ✅ CHALEGA  — space wali string non-empty hai
if ("")     { }   // ❌ nahi chalega
```

Aakhri do lines pe ruk kar socho:

```ts
const name = "   ";     // user ne sirf space daba diye
if (name) { ... }       // ye SACH hai — "   " truthy hai
```

Isi liye user input pe hamesha `.trim()` lagana parta hai. Task C2 mein yehi karna hai.

---

## 5. `switch` — jab ek hi cheez ke kai maamle hon

```ts
switch (zone) {
  case "domestic":
    return 200;
  case "regional":
    return 800;
  default:
    return 0;
}
```

### Kai cases ek sath (grouped cases)

```ts
switch (country) {
  case "IN":
  case "AE":
  case "CN":
    return "regional";     // teeno isi jagah aate hain
  default:
    return "unsupported";
}
```

Jab `case` ke baad koi code na ho, control neeche wale case mein **beh jata hai** (fallthrough).
Isay jaan boojh kar use karna bilkul theek hai — bas teeno case ek sath likho.

### `break` ka masla

```ts
switch (x) {
  case "a":
    console.log("a");     // ❌ break nahi — neeche beh jayega!
  case "b":
    console.log("b");
}
```

`x = "a"` pe **dono** chalenge. Isay accidental fallthrough kehte hain, aur ye mashhoor bug hai.

**Aaj ka trick: `switch` ke andar `break` ke bajaye seedha `return` likho.**
`return` function hi khatam kar deta hai, is liye fallthrough ho hi nahi sakta —
aur ek poori qism ke bugs khatam.

> Hamare `tsconfig.json` mein `noFallthroughCasesInSwitch: true` laga hua hai —
> compiler khud pakar lega. Lekin har project mein ye setting nahi hoti, is liye aadat sahi rakho.

### `switch` kab, `if/else` kab?

- **`switch`** — jab **ek** cheez ki **exact value** match karni ho (`zone === "domestic"`).
- **`if/else`** — jab **range** ya **kai cheezein** dekhni hon (`weight < 5 && isPrime`).

---

## 6. ★ Aaj ka asal sabaq: Guard Clause (early return)

Ye code dekho:

```ts
// ❌ pahaar
function canCheckout(items: number, address: string, paid: boolean): string {
  if (items > 0) {
    if (address !== "") {
      if (paid) {
        return "Ready to checkout.";
      } else {
        return "Payment not verified.";
      }
    } else {
      return "Address is required.";
    }
  } else {
    return "Cart is empty.";
  }
}
```

Ab yehi cheez guard clauses ke sath:

```ts
// ✅ flat
function canCheckout(items: number, address: string, paid: boolean): string {
  if (items === 0) return "Cart is empty.";
  if (address === "") return "Address is required.";
  if (!paid) return "Payment not verified.";

  return "Ready to checkout.";
}
```

Dono bilkul ek hi kaam karte hain. Lekin doosre wale mein:

- **Har line ek mukammal soch hai.** "Ye galat hai? Nikal jao." Agla. Agla.
- **Aap ko dimagh mein kuch yaad nahi rakhna parta.** Pehle wale mein aap ko yaad rakhna
  parta hai ke "abhi main teen `if` ke andar hoon, aur do `else` neeche parhe hain."
- **Asal jawab aakhir mein saaf khara hai** — pahaar ki tehon mein chhupa nahi.
- **Nayi shart lagana ek line ka kaam hai**, poore dhanche ko chherne ka nahi.

> **Qanoon: pehle galat suraton ko nikal bahar karo. Sahi rasta aakhir mein, bina kisi
> indentation ke, akela khara hona chahiye.**

Isay **guard clause** kehte hain — darban jo ghalat log darwazay se hi wapas bhej deta hai.
Kal aap ne `largestOf3` mein `else` likha tha `return` ke baad — wo isi qanoon ki khilaf-warzi thi.

---

## Aaj ke tasks

Domain: **shipping / delivery rules** — har e-commerce backend mein bilkul yehi code hota hai.

[practice.ts](practice.ts) kholo aur 8 functions poore karo.

### Part A — if / else if (tarteeb!)
- **A1** `shippingBand(weightKg)` → `"light"` / `"standard"` / `"heavy"` / `"freight"`

### Part B — switch
- **B1** `zoneFor(country)` → grouped cases + `default`
- **B2** `baseRate(zone)` → har zone ka base kiraya
- **B3** `bandMultiplier(band)` → wazan ke hisab se guna

### Part C — logical operators aur truthy/falsy
- **C1** `isFreeShipping(orderTotal, isPrime)` → `||` ka istemal
- **C2** `displayName(name)` → khaali/space wale naam pe `"Guest"`

### Part D — composition aur guard clauses
- **D1** `shippingCost(weightKg, country)` → **chaaron upar wale functions jorr kar**
- **D2** `canCheckout(itemCount, address, isPaymentVerified)` → guard clauses, tarteeb se

## Aaj ke rules

- ✋ **`any` nahi. `let` nahi. `console.log` nahi.** (kal wale rules chalte rahenge)
- ✋ **`==` nahi — hamesha `===`.**
- ✋ **`return` ke baad `else` nahi.** Guard clause style.
- ✋ **`switch` mein `break` nahi — seedha `return`.**
- ✋ **D1 mein koi naya hisab nahi.** Sirf apne banaye functions call karo.
- ✅ Har `const`, har naam **us value ka bayan** ho jo usme hai. (kal ka sabaq)
- ✅ Kaam khatam hote hi `//throw new Error(...)` wali lines **delete** karo — comment nahi.

## Chalao

```bash
npm run test:watch
```

Shuru mein **25 tests fail** honge. Wohi aap ki to-do list hai.
