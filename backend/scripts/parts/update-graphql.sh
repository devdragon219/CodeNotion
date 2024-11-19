#!/bin/bash

cd "${0%/*}/../.."

cd tmp
./RealGimm.Web --generate-schema
sudo mv -f RealGimm.Web.schema.graphql ../../graphql/

./RealGimm.WebFrontOffice --generate-schema
sudo mv -f RealGimm.WebFrontOffice.schema.graphql ../../graphql/