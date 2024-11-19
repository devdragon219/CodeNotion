terraform {
  required_providers {
    hcloud = {
      source  = "hetznercloud/hcloud"
      version = "~> 1.47.0"
    }
    local = {
      source = "hashicorp/local"
      version = "~> 2.1.0"
    }
  }

  required_version = ">= 1.0.0"
}

variable "hcloud_token" {
  description = "Hetzner Cloud API Token"
  type        = string
  sensitive   = true
}

provider "hcloud" {
    token = var.hcloud_token
}

variable "ssh_keys" {
  type    = list(string)
  default = ["ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKkJng4IOf/wjRIqjIpUgFzOCZnPUwPYw57N4kGGM2Tx alex.mazzariol@grupposcai.it",
    "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGdjaCBI8rujtfxNTqYpZVwNDwMFYBM5cQrpY8umSrWd github-actions",
    "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGWTn9WiqhYnYWzrwxoLkY07F8rTX7lFQRAQpBZPPdBk user",
    "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILfQtCqNYfO/05UIvsHR+yrKeMFE/mgEKhiKBOWTAj3u ferra@MSI-DarioV2",
    "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILxkhOwFxzaQtGIlXLekUBfeMwLRowp9j5e2KwQRl4/v user@WIN-ULJ6RBBBUL8-darioferrai",
    "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEoHinrzLKJNTi4cl9M7gJSfs7D0haZrKCC+fjJgRrZK vittorio.allegra@grupposcai.it"]
}

resource "hcloud_ssh_key" "ssh_keyset" {
  for_each = toset(var.ssh_keys)
  
  name       = "rg_${element(split(" ", each.key), 2)}"
  public_key = each.key
}

resource "hcloud_firewall" "hosting_dev_test_firewall" {
  name = "hosting-dev-test-firewall"
  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "22"
    source_ips = ["0.0.0.0/0", "::/0"]
  }
  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "80"
    source_ips = ["0.0.0.0/0", "::/0"]
  }
  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "443"
    source_ips = ["0.0.0.0/0", "::/0"]
  }
}

resource "hcloud_server" "hosting_dev" {
  name         = "hosting-dev"
  server_type  = "cx32"
  location     = "nbg1"
  image        = "ubuntu-24.04"

  ssh_keys = [
    for key in hcloud_ssh_key.ssh_keyset : key.id
  ]

  delete_protection  = true
  rebuild_protection = true
  backups = true

  firewall_ids = [
    hcloud_firewall.hosting_dev_test_firewall.id
  ]
}

resource "hcloud_server" "hosting_test" {
  name         = "hosting-test"
  server_type  = "cx32"
  location     = "nbg1"
  image        = "ubuntu-24.04"

  ssh_keys = [
    for key in hcloud_ssh_key.ssh_keyset : key.id
  ]

  delete_protection  = true
  rebuild_protection = true
  backups = true

  firewall_ids = [
    hcloud_firewall.hosting_dev_test_firewall.id
  ]
}

resource "hcloud_firewall" "hosting_alfresco_firewall" {
  name = "hosting-alfresco-firewall-updated"
  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "22"
    source_ips = ["0.0.0.0/0", "::/0"]
  }
  rule {
    direction = "in"
    protocol  = "tcp"
    port      = "8080"
    source_ips = [
      hcloud_server.hosting_dev.ipv4_address,
      hcloud_server.hosting_test.ipv4_address
    ]
  }
}

resource "hcloud_server" "hosting_alfresco" {
  name          = "hosting-alfresco"
  server_type   = "cx42"
  location      = "nbg1"
  image         = "ubuntu-24.04"
  backups       = true
  ssh_keys      = [for key in hcloud_ssh_key.ssh_keyset : key.id]
  delete_protection = true
  rebuild_protection = true
  firewall_ids  = [hcloud_firewall.hosting_alfresco_firewall.id]
}

resource "local_file" "ansible_inventory" {
  content = join("\n", [
    format("[%s]\n%s", hcloud_server.hosting_dev.name, hcloud_server.hosting_dev.ipv4_address),
    format("[%s]\n%s", hcloud_server.hosting_test.name, hcloud_server.hosting_test.ipv4_address),
    format("[%s]\n%s", hcloud_server.hosting_alfresco.name, hcloud_server.hosting_alfresco.ipv4_address)
  ])
  filename = "${path.module}/inventory.txt"
}