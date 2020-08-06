import { assertEquals } from "https://deno.land/std@0.61.0/testing/asserts.ts";
import Env from "../Env.ts";

Deno.env.set("FOO", "bar");
Deno.env.set("BAR", '{"foo": "bar", "bar": "foo"}');

Deno.test("it can return env var", () => {
  assertEquals(Env.get("FOO"), "bar");
});

Deno.test("it can return env var by checking multiple keys", () => {
  assertEquals(Env.get(["NOT_FOO", "MAYBE_FOO", "FOO"]), "bar");
});

Deno.test("it can decode json strings", () => {
  assertEquals(Env.get("BAR"), {
    foo: "bar",
    bar: "foo",
  });
});

Deno.test("it returns env as object", () => {
  // Loose smoke test
  assertEquals(Env.toObject().BAR, {
    foo: "bar",
    bar: "foo",
  });
});
