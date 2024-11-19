#!/bin/bash

cd hosting || { echo "Please run from root of repository"; exit 1; }

if [[ "$#" -ne 1 ]]; then
    echo "Usage: $0 <host>"
    exit 1
fi

ansible-playbook --private-key ssh_key --user root \
  -i inventory.txt --limit $1 \
  playbook-base.yml \
  playbook-dev.yml \
  playbook-test.yml \
  playbook-alfresco.yml