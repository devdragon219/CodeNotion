#!/bin/bash

sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --batch --no-tty --dearmor -o /etc/apt/keyrings/nodesource.gpg

sudo mkdir -p /opt/rg5-cache
sudo chmod 777 /opt/rg5-cache

NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt-get update
sudo apt-get install nodejs -y

echo "Sleeping infinity for vscode functionality"

sleep infinity