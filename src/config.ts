export interface KustomizeConfig {
  base: string;
  commands: string[];
}

export interface NetrcConfig {
  machine: string;
  login: string;
  password: string;
}

export interface RepositoryConfig {
  remote: string;
  branch: string;
  netrc: NetrcConfig;
}

export interface Config {
  kustomize: KustomizeConfig;
  repository: RepositoryConfig;
}
