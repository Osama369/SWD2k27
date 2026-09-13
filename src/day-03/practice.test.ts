import { describe, it, expect } from "vitest";
import {
  totalMarks,
  averageMarks,
  highestMark,
  countPassing,
  firstFailingIndex,
  gradeFor,
  gradesFor,
  attendancePercent,
} from "./practice.js";

describe("Part A — accumulator", () => {
  it("A1: saare marks jama karta hai", () => {
    expect(totalMarks([80, 45, 92])).toBe(217);
    expect(totalMarks([10])).toBe(10);
  });

  it("A1: khaali list pe 0", () => {
    expect(totalMarks([])).toBe(0);
  });

  it("A2: average nikalta hai aur round karta hai", () => {
    expect(averageMarks([80, 45, 92])).toBe(72);
    expect(averageMarks([50, 50])).toBe(50);
  });

  it("A2: khaali list pe 0 (NaN nahi)", () => {
    expect(averageMarks([])).toBe(0);
  });

  it("A3: sab se bara mark", () => {
    expect(highestMark([80, 45, 92])).toBe(92);
    expect(highestMark([92, 45, 80])).toBe(92);
    expect(highestMark([10])).toBe(10);
  });

  it("A3: khaali list pe 0", () => {
    expect(highestMark([])).toBe(0);
  });

  it("A: input list ko badalta nahi", () => {
    const marks = [80, 45, 92];
    totalMarks(marks);
    averageMarks(marks);
    highestMark(marks);
    expect(marks).toEqual([80, 45, 92]);
  });
});

describe("Part B — ginti aur talash", () => {
  it("B1: pass hone walon ki ginti", () => {
    expect(countPassing([80, 45, 92, 33], 40)).toBe(3);
    expect(countPassing([10, 20, 30], 40)).toBe(0);
  });

  it("B1: boundary — theek passMark bhi pass hai", () => {
    expect(countPassing([40, 40], 40)).toBe(2);
    expect(countPassing([39], 40)).toBe(0);
  });

  it("B1: khaali list pe 0", () => {
    expect(countPassing([], 40)).toBe(0);
  });

  it("B2: pehle fail ka index deta hai", () => {
    expect(firstFailingIndex([80, 45, 30, 20], 40)).toBe(2);
    expect(firstFailingIndex([10, 80], 40)).toBe(0);
  });

  it("B2: koi fail na ho to -1", () => {
    expect(firstFailingIndex([80, 90], 40)).toBe(-1);
  });

  it("B2: khaali list pe -1", () => {
    expect(firstFailingIndex([], 40)).toBe(-1);
  });

  it("B2: PEHLA fail deta hai, aakhri nahi", () => {
    expect(firstFailingIndex([90, 10, 20, 5], 40)).toBe(1);
  });
});

describe("Part C — badalna (transform)", () => {
  it("C1: har grade band", () => {
    expect(gradeFor(95)).toBe("A");
    expect(gradeFor(70)).toBe("B");
    expect(gradeFor(55)).toBe("C");
    expect(gradeFor(42)).toBe("D");
    expect(gradeFor(10)).toBe("F");
  });

  it("C1: boundaries — 80, 65, 50, 40", () => {
    expect(gradeFor(80)).toBe("A");
    expect(gradeFor(79)).toBe("B");
    expect(gradeFor(65)).toBe("B");
    expect(gradeFor(64)).toBe("C");
    expect(gradeFor(50)).toBe("C");
    expect(gradeFor(49)).toBe("D");
    expect(gradeFor(40)).toBe("D");
    expect(gradeFor(39)).toBe("F");
  });

  it("C2: poori list ke grades", () => {
    expect(gradesFor([95, 70, 55, 42, 10])).toEqual(["A", "B", "C", "D", "F"]);
  });

  it("C2: khaali list pe khaali list", () => {
    expect(gradesFor([])).toEqual([]);
  });

  it("C2: input list ko badalta nahi", () => {
    const marks = [95, 70];
    gradesFor(marks);
    expect(marks).toEqual([95, 70]);
  });

  it("C2: har dafa NAYI list deta hai", () => {
    const marks = [95, 70];
    const first = gradesFor(marks);
    const second = gradesFor(marks);
    expect(first).toEqual(second);
    expect(first).not.toBe(second); // barabar hain, lekin ek hi object nahi
  });
});

describe("Part D — attendance", () => {
  it("D1: hazri ka percentage", () => {
    expect(attendancePercent([true, true, true, false])).toBe(75);
    expect(attendancePercent([true, true])).toBe(100);
  });

  it("D1: round karta hai", () => {
    expect(attendancePercent([true, false, false])).toBe(33);
    expect(attendancePercent([true, true, false])).toBe(67);
  });

  it("D1: sab absent pe 0", () => {
    expect(attendancePercent([false, false])).toBe(0);
  });

  it("D1: khaali list pe 0 (NaN nahi)", () => {
    expect(attendancePercent([])).toBe(0);
  });
});
