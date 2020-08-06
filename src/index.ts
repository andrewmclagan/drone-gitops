import Env from "./Env.ts";
import Cmd from "./Cmd.ts";
import Plugin from "./Plugin.ts";

const repository = Env.get("PLUGIN_REPO");

const basePath = Env.get("PLUGIN_BASE_PATH");

const commands = Env.get("PLUGIN_KUSTOMIZE");

const netrc = {
  machine: Env.get("DRONE_NETRC_MACHINE"),
  login: Env.get("DRONE_NETRC_USERNAME"),
  password: Env.get("DRONE_NETRC_PASSWORD"),
};

let config = {
  kustomize: {
    base: basePath ?? ".",
    commands: commands ?? [],
  },
  repository: {
    remote: repository,
    branch: "master",
    netrc,
  },
};

new Plugin(config, new Cmd()).run();
