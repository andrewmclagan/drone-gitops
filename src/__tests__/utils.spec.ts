import { assertEquals } from "https://deno.land/std@0.61.0/testing/asserts.ts";
import { base64Decode, jsonParse } from "../utils.ts";

// base64Decode()
Deno.test("it can decode base64 strings", () => {
  assertEquals(base64Decode("aGVsbG8gd29ybGQ="), "hello world");
});

Deno.test("it always returns strings", () => {
  assertEquals(base64Decode("not-base-64"), "");
});

// jsonParse()
Deno.test("it can decode json strings", () => {
  assertEquals(
    jsonParse('{"name": "Catty McCat", "age": 2, "sex": "unknown"}'),
    { name: "Catty McCat", age: 2, sex: "unknown" }
  );
});

Deno.test("it always returns strings", () => {
  assertEquals(jsonParse("not-json"), {});
});
