import { exists, writeFileStr } from "https://deno.land/std@0.61.0/fs/mod.ts";
import { sprintf } from "https://deno.land/std@0.61.0/fmt/printf.ts";
import { join } from "https://deno.land/std@0.61.0/path/mod.ts";
import { RepositoryConfig } from "./config.ts";
import Cmd from "./Cmd.ts";

const netrcFile: string = `
machine %s
login %s
password %s
`;

class Repository {
  private config: RepositoryConfig;

  private cmd: Cmd;

  constructor(config: RepositoryConfig, cmd: Cmd) {
    this.config = config;
    this.cmd = cmd;
  }

  async clone(): Promise<string> {
    await this.writeNetrc();

    const { branch, remote } = this.config;

    const path: string = await Deno.makeTempDir();

    await this.cmd.run([
      "git",
      "clone",
      "--single-branch",
      `--branch=${branch}`,
      "--depth=1",
      "--verbose",
      remote,
      path,
    ]);

    return path;
  }

  async add(path: string): Promise<void> {
    await this.writeNetrc();

    await this.cmd.run(["git", "add", "--all", `--git-dir=${path}`]);
  }

  async commit(path: string): Promise<void> {
    await this.writeNetrc();

    const branch: string = <string>Deno.env.get("DRONE_BRANCH");
    const tag: string = <string>Deno.env.get("DRONE_TAG");
    const commit: string = <string>Deno.env.get("DRONE_COMMIT");
    const author: string = <string>Deno.env.get("DRONE_AUTHOR");

    const message: string = `BRANCH: ${branch} TAG: ${tag} COMMIT: ${commit} AUTHOR: ${author}`;

    await this.cmd.run(["git", "commit", "-m", message, `--git-dir=${path}`]);
  }

  async push(path: string): Promise<void> {
    await this.writeNetrc();

    await this.cmd.run(["git", "push", `--git-dir=${path}`]);
  }  

  private async writeNetrc(): Promise<void> {
    const { machine, login, password } = this.config.netrc;

    const netrcContent: string = sprintf(netrcFile, machine, login, password);

    const homePath: string = <string>Deno.env.get("HOME");

    const netrcPath: string = join(homePath, ".netrc");

    if ((await exists(netrcPath)) === false) {
      await writeFileStr(netrcPath, netrcContent);

      await Deno.chmod(netrcPath, 0o600);
    }
  }
}

export default Repository;
