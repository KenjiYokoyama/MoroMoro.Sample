FROM node:12.16-buster-slim
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    #
    # Verify git, process tools installed
    && apt-get -y install --no-install-recommends git openssh-client iproute2 procps \
    #
    #####
    # https://github.com/Microsoft/vscode-dev-containers/tree/master/containers/docker-in-docker#how-it-works--adapting-your-existing-dev-container-config
    # Note that no recommended packages are required, except for gnupg-agent.
    #
    # Install Docker CE CLI
    && apt-get install -y --no-install-recommends apt-transport-https ca-certificates curl software-properties-common lsb-release jq \
    && apt-get install -y gnupg-agent \
    && curl -fsSL https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/gpg | apt-key add - 2>/dev/null \
    && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]') $(lsb_release -cs) stable" \
    && apt-get update \
    && apt-get install -y --no-install-recommends docker-ce-cli \
    #
    # Install Docker Compose
    && curl -sSL "https://github.com/docker/compose/releases/download/$(curl https://api.github.com/repos/docker/compose/releases/latest | jq .name -r)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
    && chmod +x /usr/local/bin/docker-compose \
    #####
    #
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*
ENV DEBIAN_FRONTEND=dialog
