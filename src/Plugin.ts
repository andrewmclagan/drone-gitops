import { Config } from "./config.ts";
import Cmd from "./Cmd.ts";
import Repository from "./Repository.ts";
import Kustomize from "./Kustomize.ts";
import { debug } from "./utils.ts";

class Plugin {
  protected config: Config;

  protected cmd: Cmd;

  constructor(config: Config, cmd: Cmd) {
    this.config = config;
    this.cmd = cmd;
  }

  async run(): Promise<void> {
    debug(this.config);

    const repository = new Repository(this.config.repository, this.cmd);
    const kustomize = new Kustomize(this.config.kustomize, this.cmd);

    const repoRoot = await repository.clone();

    const success = await kustomize.edit(repoRoot);

    if (success) {
      repository.add(repoRoot);
      repository.commit(repoRoot);
      repository.push(repoRoot);
    }
  }
}

export default Plugin;
