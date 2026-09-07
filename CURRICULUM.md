# 21 Din: Foundation → Pro (TypeScript)

**Track ka rule:** pehle main reference solution likhta hoon (`lesson.ts`) — lekin hamesha
kisi **alag domain** pe. Phir aap khaali file se khud wohi technique likhte ho
(`practice.ts`) jab tak saare tests pass na ho jayen. Copy-paste bilkul nahi.
Mushkil lagna hi asal maqsad hai — vibe-coding ne yehi hissa skip kiya tha.

## Week 1 — Programming Fundamentals (bilkul zero se)

| Din | Topic | Real-world model |
|-----|-------|------------------|
| 01 | Values, variables (`const`/`let`), primitive types, functions, return | Invoice line calculator |
| 02 | Control flow: `if`/`else`, ternary, `switch`, truthy/falsy, comparison ops | Shipping rules engine |
| 03 | Arrays + loops: `for`, `for...of`, indexing, length | Marks / attendance register |
| 04 | Objects: properties, nesting, dot vs bracket access, object arrays | Product catalog |
| 05 | Functions deep: `map` / `filter` / `reduce`, callbacks, arrow functions | Cart calculations |
| 06 | Scope, closures, `const` immutability, pure vs impure functions | Counter + discount rules |
| 07 | **Checkpoint 1:** in 6 dinon se ek chhota module khud banao |

## Week 2 — OOP + Type System

| Din | Topic | Real-world model |
|-----|-------|------------------|
| 08 | OOP I: `class`, object, `constructor`, properties, methods, `this` | Student / BankAccount |
| 09 | OOP II: encapsulation — `private`, `readonly`, getters, invariants | BankAccount (safe version) |
| 10 | OOP III: inheritance, `extends`, `super`, method override, `abstract` | Employee hierarchy |
| 11 | OOP IV: `interface`, polymorphism, composition vs inheritance | Notification senders |
| 12 | Type system: unions, narrowing, discriminated unions, `readonly` | Order lifecycle |
| 13 | Generics + reusable types | `Repository<T>` |
| 14 | **Checkpoint 2:** OOP module + review |

## Week 3 — Design Patterns, DSA, Capstone

| Din | Topic | Real-world model |
|-----|-------|------------------|
| 15 | SOLID principles (smells ke sath) | God-class ka refactor |
| 16 | Creational + Structural patterns: Factory, Builder, Adapter, Decorator | 3rd-party gateways |
| 17 | Behavioral patterns: Strategy, Observer, Command | Pricing rules + event bus |
| 18 | Big-O, arrays, hash maps (`Map` / `Set`) | Dedupe, frequency count, cache |
| 19 | Two pointers, sliding window, stacks, queues | Rate limiter, undo stack |
| 20 | Recursion, trees, sorting, searching | Category tree, top-K leaderboard |
| 21 | **Capstone:** poora module — domain + patterns + DSA + tests |

> **Saaf baat:** DSA ke liye 3 din kam hain. Week 3 mein hum uska core + soch ka tareeqa
> pakrenge; is ke baad DSA rozana 1 problem ki practice ka kaam hai, ek dafa ka nahi.

## Rozana ka loop (60–120 min)

1. `src/day-XX/README.md` parho — aaj ka brief aur senior principle.
2. Mera `lesson.ts` **ek dafa** parho, phir band kar do.
3. `practice.ts` kholo aur khud likho — saamne rakh kar nahi, samajh se.
4. `npm test` chalao jab tak sab green na ho.
5. Mujhe bhejo — main real PR ki tarah review karunga, phir agla din khulega.
