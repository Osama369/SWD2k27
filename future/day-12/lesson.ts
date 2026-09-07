/**
 * DAY 12 — REFERENCE SOLUTION (ek dafa parho, phir band kar do)
 *
 * DHYAN DO: maine jaan boojh kar aap ke task se ALAG domain model kiya hai.
 * Aap ke paas Orders hain. Mere paas Support Tickets. Technique wohi hai, shape alag —
 * taake aap copy-paste na kar sako. Aap ko *idea* transfer karna hai, text nahi.
 *
 * Domain: ek support ticket in states se guzarta hai:
 *   open ──assign──► assigned ──resolve──► resolved ──close──► closed
 *     │                  │
 *     └───reject───► rejected ◄───reject───┘
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. THE MODEL — sab se pehle model, kyunke baqi sab isi se nikalta hai
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Wo fields jo HAR ticket ke paas hain, chahe wo kisi bhi state mein ho.
 *
 * `readonly` ka matlab: object ban jane ke baad ye field dobara assign nahi ho sakti.
 * Yani immutability humein *type level* pe mil rahi hai — apni discipline pe bharosa
 * karne ke bajaye compiler humein rok raha hai.
 */
interface TicketBase {
  readonly id: string;
  readonly subject: string;
  readonly createdAt: Date;
}

/**
 * Har state ka apna alag interface. Har ek ke paas BILKUL wohi data hai jo us state ka
 * hai — kabhi bhi koi aisi field nahi jo "shayad ho sakti hai".
 *
 * `status` yahan DISCRIMINANT hai: ye ek literal type hai ("open" aisa type hai jiski
 * sirf ek hi value mumkin hai — open). TypeScript isi field ko dekh kar pehchanta hai
 * ke union ka kaunsa variant hai.
 */
interface OpenTicket extends TicketBase {
  readonly status: "open";
}

interface AssignedTicket extends TicketBase {
  readonly status: "assigned";
  readonly assigneeId: string;
  readonly assignedAt: Date;
}

interface ResolvedTicket extends TicketBase {
  readonly status: "resolved";
  readonly assigneeId: string;
  readonly assignedAt: Date;
  readonly resolvedAt: Date;
  readonly resolution: string;
}

interface ClosedTicket extends TicketBase {
  readonly status: "closed";
  readonly assigneeId: string;
  readonly resolvedAt: Date;
  readonly closedAt: Date;
  readonly resolution: string;
}

interface RejectedTicket extends TicketBase {
  readonly status: "rejected";
  readonly reason: string;
}

/**
 * YE RAHA DISCRIMINATED UNION.
 * Ek Ticket in paanch shapes mein se THEEK EK hai — kabhi mix nahi.
 *
 * Ye line hi poora sabaq hai:
 *   { status: "open", assigneeId: "u1" }  ← compile error. Bug likha hi nahi ja sakta.
 */
export type Ticket =
  | OpenTicket
  | AssignedTicket
  | ResolvedTicket
  | ClosedTicket
  | RejectedTicket;

// ─────────────────────────────────────────────────────────────────────────────
// 2. ERRORS — naam wala error type, sirf string throw karna kaafi nahi
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Apna error class banane ka faida: caller `instanceof` se pehchan sakta hai ke ye
 * business rule ka error hai ya koi crash. Sath hi `from` aur `action` structured data
 * ke tor pe milte hain — logs mein parse karne ke liye string todni nahi parti.
 */
export class InvalidTransitionError extends Error {
  constructor(
    readonly from: Ticket["status"],   // indexed access: sab statuses ka union ban gaya
    readonly action: string,
  ) {
    super(`Cannot ${action} a ticket in state "${from}".`);
    this.name = "InvalidTransitionError";
  }
}

/**
 * Exhaustiveness guard.
 *
 * Agar `switch` ne saare variants handle kar liye, to TS ke paas bachta hai `never`,
 * aur `never` ko `never` mein pass karna theek hai — compile ho jata hai.
 *
 * Lekin kal aap ne chhati state add ki aur uska case likhna bhool gaye? Ab bacha hua
 * type `never` nahi raha, aur ye line COMPILE ERROR de degi — seedha us jagah ishara
 * karte hue jahan aap bhoole. Ye "purana switch update karna bhool gaya" wale poore
 * class of bugs ko khatam kar deta hai.
 */
function assertNever(value: never, context: string): never {
  throw new Error(`${context}: unhandled variant ${JSON.stringify(value)}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. TRANSITIONS — pure functions: (purani state, input) => nayi state
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Signature dhyan se dekho: ye poora union leta hai, sirf OpenTicket nahi.
 * Kyun? Kyunke real code mein aap ke paas "ek ticket" hota hai aur aap usay move karne
 * ko kehte ho. Neeche wala guard hi wo jagah hai jahan hum prove karte hain ke asal
 * mein kaunsa variant humare paas hai.
 */
export function assign(ticket: Ticket, assigneeId: string, at: Date): Ticket {
  // NARROWING: is check ke baad TS ko pata hai ke neeche `ticket` OpenTicket hi hai.
  if (ticket.status !== "open") {
    throw new InvalidTransitionError(ticket.status, "assign");
  }

  // Base ki fields le kar nayi state ka data add kiya.
  // `ticket` ko kabhi mutate nahi kiya — hamesha naya object banaya.
  return {
    id: ticket.id,
    subject: ticket.subject,
    createdAt: ticket.createdAt,
    status: "assigned",
    assigneeId,
    assignedAt: at,
  };
}

export function resolve(ticket: Ticket, resolution: string, at: Date): Ticket {
  if (ticket.status !== "assigned") {
    throw new InvalidTransitionError(ticket.status, "resolve");
  }
  // Yahan TS ko *yaqeen* hai ke ticket.assigneeId mojood hai.
  // Na `?.` ki zaroorat, na `!` ki. Model ne guarantee de di.
  return {
    ...ticket,
    status: "resolved",
    resolvedAt: at,
    resolution,
  };
}

export function close(ticket: Ticket, at: Date): Ticket {
  if (ticket.status !== "resolved") {
    throw new InvalidTransitionError(ticket.status, "close");
  }
  return {
    id: ticket.id,
    subject: ticket.subject,
    createdAt: ticket.createdAt,
    status: "closed",
    assigneeId: ticket.assigneeId,
    resolvedAt: ticket.resolvedAt,
    closedAt: at,
    resolution: ticket.resolution,
  };
}

/**
 * Aisa transition jo EK SE ZYADA states se valid hai.
 * Note: array pe `includes` lagane se narrowing NAHI hoti, is liye explicit union
 * check likha hai.
 */
export function reject(ticket: Ticket, reason: string): Ticket {
  if (ticket.status !== "open" && ticket.status !== "assigned") {
    throw new InvalidTransitionError(ticket.status, "reject");
  }
  return {
    id: ticket.id,
    subject: ticket.subject,
    createdAt: ticket.createdAt,
    status: "rejected",
    reason,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. UNION KO PARHNA — switch + exhaustiveness
// ─────────────────────────────────────────────────────────────────────────────

export function describe(ticket: Ticket): string {
  switch (ticket.status) {
    case "open":
      return `#${ticket.id} is waiting for an agent.`;
    case "assigned":
      // Is case ke andar `ticket` AB AssignedTicket hai. assigneeId guaranteed hai.
      return `#${ticket.id} is being handled by ${ticket.assigneeId}.`;
    case "resolved":
      return `#${ticket.id} was resolved: ${ticket.resolution}`;
    case "closed":
      return `#${ticket.id} is closed.`;
    case "rejected":
      return `#${ticket.id} was rejected: ${ticket.reason}`;
    default:
      // Yahan kabhi pohanch hi nahi sakte — aur compiler ise prove karta hai.
      return assertNever(ticket, "describe");
  }
}

/**
 * TYPE PREDICATE (`x is Y`).
 *
 * Aam function jo sirf `boolean` return kare, wo compiler ko kuch nahi batata —
 * caller ke paas type phir bhi poora union rehta hai.
 *
 * Lekin `ticket is ResolvedTicket | ClosedTicket` likhne se aap compiler ko sikha rahe
 * ho ke aap ne kya prove kiya. Ab jo bhi is function ko call karega, usay narrowing
 * muft mil jayegi — jaise neeche `filter` mein hua.
 */
export function isReopenable(ticket: Ticket): ticket is ResolvedTicket | ClosedTicket {
  return ticket.status === "resolved" || ticket.status === "closed";
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. AGGREGATION — reduce, na mutation na loop
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Un tickets ka average resolution time (minutes mein) jo waqai resolve tak pohanche.
 *
 * Ye pattern yaad rakho: PEHLE filter kar ke sirf wo variants nikalo jin se kaam hai
 * (isi se type bhi narrow ho jata hai), PHIR fold/reduce karo.
 */
export function averageResolutionMinutes(tickets: readonly Ticket[]): number {
  // isReopenable type predicate hai, is liye `resolved` ka type ab
  // (ResolvedTicket | ClosedTicket)[] hai — dono ke paas resolvedAt guaranteed hai.
  const resolved = tickets.filter(isReopenable);

  if (resolved.length === 0) return 0;

  const totalMinutes = resolved.reduce(
    (sum, t) => sum + (t.resolvedAt.getTime() - t.createdAt.getTime()) / 60_000,
    0,
  );

  return totalMinutes / resolved.length;
}
