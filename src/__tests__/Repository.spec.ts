import { readFileStr } from "https://deno.land/std@0.61.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.61.0/path/mod.ts";
import Repository from "../Repository.ts";
import Cmd from "../Cmd.ts";
import {
  assertStringContains,
  assertEquals,
} from "https://deno.land/std@0.61.0/testing/asserts.ts";
import {
  stub,
  Stub,
} from "https://raw.githubusercontent.com/udibo/mock/v0.3.0/stub.ts";

const config: any = {
  remote: "https://bitbucket.org/mock-repo-org/mock-repo.git",
  branch: "master",
  netrc: {
    machine: "bitbucket.org",
    login: "mocker_user",
    password: "ej0fWMHPTuDWHLfVG69A",
  },
};

Deno.test({
  name: "it can clone a repository",
  async fn(): Promise<void> {
    const cmd = new Cmd();

    const run: Stub<Cmd> = stub(cmd, "run");

    let repository = new Repository(config, cmd);

    await repository.clone();

    const command: string[] = run.calls[0].args[0];

    assertEquals(command[0], "git");
    assertEquals(command[1], "clone");
    assertEquals(command[2], "--single-branch");
    assertEquals(command[3], `--branch=${config.branch}`);
    assertEquals(command[4], "--depth=1");
    assertEquals(command[5], config.remote);
  },
});

Deno.test({
  name: "it creates a netrc file",
  async fn(): Promise<void> {
    const cmd = new Cmd();

    const run: Stub<Cmd> = stub(cmd, "run");

    let repository = new Repository(config, cmd);

    await repository.clone();

    const homePath: string = <string>Deno.env.get("HOME");

    const netrcPath: string = join(homePath, ".netrc");

    let netrcContent = await readFileStr(netrcPath);

    assertStringContains(netrcContent, `machine ${config.netrc.machine}`);
    assertStringContains(netrcContent, `login ${config.netrc.login}`);
    assertStringContains(netrcContent, `password ${config.netrc.password}`);
  },
});
