import { debug } from "./utils.ts";

class Cmd {
  async run(cmd: Array<string>): Promise<boolean> {
    debug(cmd.join(" "));

    const process = Deno.run({ cmd: cmd });

    const status = await process.status();

    process.close();

    if (!status.success) {
      Deno.exit(1);
    }
    
    return status.success;
  }
}

export default Cmd;
