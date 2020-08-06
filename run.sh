#!/bin/sh

      "git",
      "clone",
      "--single-branch",
      `--branch=${branch}`,
      "--depth=1",
      "--verbose",

mkdir -p /tmp/config-repo

git clone --single-branch --branch=master --depth=1 --verbose $PLUGIN_REPO /tmp/config-repo

cd /tmp/config-repo/$PLUGIN_BASE_PATH

kustomize edit set image gcr.io/beam-au/api:1.9.1

