import { assertEquals } from "https://deno.land/std@0.61.0/testing/asserts.ts";
import Cmd from "../Cmd.ts";

Deno.test("it executes commands and returns success", async () => {
  /**
   * Smoke test, hard to mock functions in the Deno namespace
   **/ 
  const instance = new Cmd();

  const result: boolean = await instance.run(["echo", "foo"]);

  assertEquals(result, true);
});
