#!/bin/bash

find ./lib/gql/* ! -name 'scalars.ts' -type f -exec rm -f {} +
