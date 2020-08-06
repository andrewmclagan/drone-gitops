import Env from "./Env.ts";
import Cmd from "./Cmd.ts";
import Plugin from "./Plugin.ts";

const repository = Env.get("PLUGIN_REPO");

const kustomize = Env.get("PLUGIN_KUSTOMIZE");

const netrc = {
  machine: Env.get("DRONE_NETRC_MACHINE"),
  login: Env.get("DRONE_NETRC_USERNAME"),
  password: Env.get("DRONE_NETRC_PASSWORD"),
};

let config = {
  kustomize: {
    base: kustomize.base ?? ".",
    commands: kustomize.edit ?? [],
  },
  repository: {
    remote: repository.remote,
    branch: repository.branch ?? "master",
    netrc,
  },
};

new Plugin(config, new Cmd()).run();
