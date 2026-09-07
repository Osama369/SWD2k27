import { defineConfig } from "vitest/config";

// Sirf `src/` ke tests chalte hain. `future/` mein wo din parked hain jo abhi khule nahi.
export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
  },
});
