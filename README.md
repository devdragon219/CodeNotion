RealGimm
========

This is the RealGimm code repository for backend and web-frontend.

`dev` branch build+test status: [![build-and-test](https://github.com/ScaiTecno-SPA/RealGimm5/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/ScaiTecno-SPA/RealGimm5/actions/workflows/build-and-test.yml)


Git and Git flow
--------

The git repository is expected to have all human-readable text in English, save for any exceptional cases where specific languages may be used.

Commit messages are expected to be in English, with a one-word summary of the contribution type (e.g. feat, chore, fix, refactor, minor, etc. etc.) and a brief summary of the changes.

Work is mostly done in branches opened from `dev`, but some minor fixups that are not related to functionality may be done directly in `dev`. The branch name should mention the JIRA ticket of the unit of work that is to be done; it is encouraged the use of a one-word summary of the unit-of-work contribution type (e.g. fix, feat, refactor, etc. etc.) followed by a slash and then a dash-spaced description of the change, ending with the JIRA ticket number.

This repository is built around the `dev` branch for development activities. All developers are expected to branch off of `dev` to perform a single unit of work, and then ask for a Pull Request to `dev` when done.

Once the code in `dev` is stable enough, it can be promoted to a `test` branch, where it can be tested and moved to other environments as needed (i.e. QA, pre-prod, staging, other environments).

Once accepted, the code is moved in `main` for release. Other branches (e.g. `trial`) can be started from `test` to allow for ad-hoc preview instances to select customers.


Starting the dev env
--------------------

To start a development environment just open the repository with VS Code. A request about devcontainers should pop-up, prompting the user to start one of the available devcontainers. The development devcontainer cluster starts a full-fledged environment for both backend and frontend testing; once started, nodejs will be automatically installed. Use `backend/scripts/run-tasks.sh` or `backend/scripts/run-dev.sh` at a terminal to start the relevant backend services, or `cd frontend && yarn run start:web` to start the frontend host. You can also use `backend/scripts/run-tenantctl.sh` to run TenantCtl commands.

The backend scripts ensure the latest backend is built before running their commands; once a build has completed, you can also directly start programs in the `backend/tmp` directory.

Once an environment is started, it is recommended to create a new tenant by using TenantCtl in the backend container, so that the database is initialized and ready to be used. TenantCtl will print the credentials for the newly-created admin user.


Notes for developing on Windows
-------------------------------

If you are developing on Windows please use WSL instead of Docker Desktop. To run the "test.sh" script, that uses several docker containers, ensure you are inside the WSL terminal. You may need to install the relevant dotnet sdk for your distribution.


Hosting the dev server
----------------------

Inside the `hosting/dev/` directory there are sample files to setup a development server. Ensure the artifacts from the CI are stored in the server, and use the script to update images and restart the docker-compose cluster.


OpenCMIS InMemory server
------------------------

To aid in the development of the CMIS-compatible document storage integration, an implementation of the OpenCMIS InMemory server is provided inside `tools/opencmis-inmemory/` that can be started via the `start-jetty.sh` script. This requires a reasonably recent JRE to run - it has been tested with OpenJDK 17.

Once started, the server will be available on port 8081, so an ATOMPub binding URL will be `http://localhost:8081/inmemory/atom`. Any username will do (e.g. `test`), and no password is required.


Migrations
----------

Inside the `backend/src/Infrastructure` directory there are several migration chains, handled by EntityFramework Core. These are not handled by the default automatic migrator, but are handled manually by custom services. One caveat of this is that, should the InitialCreate (first) migration be recreated, the line that sets the annotation for the Postgis extension should be removed - this is hopefully taken care of by the add-migration script, but is a possible point to check. This because the migrations are started all together, and the presence of many CREATE EXTENSION IF NOT EXISTS at the same time, even if the "IF NOT EXISTS" clause is specified, produces errors in postgresql that prevent the database creation from successfully happening.


Manually update installations
-----------------------------

Development and Test installations are supposed to automatically update once every few minutes, depending on the specific server, while trial/production installations are not configured to automatically update.

In both cases, the installation is typically hosted in the `/opt/` directory and, inside that directory, a script `update-images.sh` is located. The script is automatically started on the development/test environments.

To manually force an update, log into the machine (the usual user is `user`, and your SSH key should have been added to the authorized list), change to super user (`sudo su`), move to the `/opt/` directory and start `bash update-images.sh`. Try to avoid launching two instances of the script together (i.e., the automatic one and your manually run one).


Vanilla product and Customizations
----------------------------------

The vanilla product is available in this repository. Customizations should add a deploy key to the repository and, as part of their own deployment, download and build a specific version of the application, preferably from the `main` branch.


Google Artifact Registry configuration
--------------------------------------

The recommended configuration for customizations is having one `deploy-artifact` service account with Artifact Registry Administrator rights, and a `download-artifacts` service account with Artifact Registry Reader rights.
