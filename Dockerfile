FROM hayd/alpine-deno:1.2.0 AS build

ENV KUSTOMIZE_VER 3.3.1

#
#--------------------------------------------------------------------------
# Install deps
#--------------------------------------------------------------------------
#

RUN apk --no-cache add git curl gettext

RUN curl -L https://github.com/kubernetes-sigs/kustomize/releases/download/v${KUSTOMIZE_VER}/kustomize_${KUSTOMIZE_VER}_linux_amd64  -o /usr/bin/kustomize \
    && chmod +x /usr/bin/kustomize

#
#--------------------------------------------------------------------------
# Run
#--------------------------------------------------------------------------
#

RUN mkdir -p /var/drone-gitops

ADD . /var/drone-gitops

WORKDIR /var/drone-gitops

RUN deno bundle -A --unstable ./src/index.ts ./drone-gitops.js

ENTRYPOINT ["deno"]

CMD ["run","-A","--unstable","/var/drone-gitops/drone-gitops.js"]
