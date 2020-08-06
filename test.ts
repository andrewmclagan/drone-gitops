import { join } from "https://deno.land/std@0.63.0/path/mod.ts";

class Cmd {
  async run(cmd: Array<string>): Promise<boolean> {
    console.log("cmd: ", cmd.join(" "));

    const process = Deno.run({ cmd: cmd });

    const status = await process.status();

    process.close();

    if (!status.success) {
      Deno.exit(1);
    }

    return status.success;
  }
}

(async () => {
  const paths = join("/Users", "andrewmclagan","development","drone-gitops");
  await new Cmd().run(["cd", paths]);
  await new Cmd().run(["ls", "-la"]);
})();
