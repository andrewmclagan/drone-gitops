import { green, magenta } from "https://deno.land/std@0.61.0/fmt/colors.ts";
import Env from "./Env.ts";

export function base64Decode(value: string): string {
  try {
    return atob(value);
  } catch (error) {
    return "";
  }
}

export function jsonParse(value: string): object {
  try {
    return JSON.parse(value);
  } catch (error) {
    return {};
  }
}

export function jsonStringify(value: any): string {
  try {
    return JSON.stringify(value);
  } catch (error) {
    return "";
  }
}

export function debug(value: any): void {
  if (Env.get(["GKE_DEBUG", "PLUGIN_DEBUG"])) {
    console.log(magenta('DEBUG >>'), value);
  }
}

export function log(value: any): void {
  console.log(green('LOG >>'), value);
}
