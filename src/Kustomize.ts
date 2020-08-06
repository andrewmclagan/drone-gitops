import { join } from "https://deno.land/std@0.63.0/path/mod.ts";
import { KustomizeConfig } from "./config.ts";
import Cmd from "./Cmd.ts";

class Kustomize {
  private config: KustomizeConfig;

  private cmd: Cmd;

  constructor(config: KustomizeConfig, cmd: Cmd) {
    this.config = config;
    this.cmd = cmd;
  }

  async edit(repoPath: string): Promise<boolean> {
    const { base, commands } = this.config;

    const fullPath: string = join([repoPath, base]);

    // kustomize cli does not have a `--dir-base` option
    if ((await this.cmd.run(["cd", fullPath])) === false) {
      return false;
    }

    for (let i = 0; i < commands.length; i++) {
      const parts: string[] = commands[i].split(" ");

      if ((await this.cmd.run(["kustomize", ...parts])) === false) {
        return false;
      }
    }

    return true;
  }
}

export default Kustomize;