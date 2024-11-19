RealGimm Backend
================

Technology:
 * C# on dotnet core
 * EntityFrameworkCore
 * AspNetCore
 * Clean Architecture template (from Ardalis)
 * GraphQL web framework (HotChocolate from ChilliCream)


Developing
----------

To work on this repository, use VS Code with the recommended C# extension. A container is also available to have a consistent experience across environments.

To aid local testing a postgres container is provided; running the code inside the development container, it should automatically create any missing database inside postgres and allow for a correct startup.

Once the base layout is created, with the central tenant list database, a new tenant should be created. Refer to TenantCtl for usage and examples.


Conventions
-----------

There are a few conventions that make automations work.

One is the fact that, inside the `Infrastructure` module, all DbContext classes must have a prefix like the module directory name, e.g. the db context for the `Anag/` module has an `AnagDbContext` class name.


Building
--------

Use the prepared scripts in `backend/scripts` to build the source code. The script takes care to copy the relevant Assemblies for dependency injection in the target `backend/tmp` directory.

Once built, run by changing to the `backend/tmp` directory and starting `./RealGimm.Web`


Packaging for release
---------------------

To build a release container use `backend/scripts/package.sh`; the relevant image will be built with the latest sources available.


Adding a migration for a DbContext
----------------------------------

Use the `backend/scripts/add-migration.sh` to add a migration to a context. The name of the module and the name of the migration must be specified as parameters:

  $ scripts/add-migration.sh Anag SubjectFiscalCode

Test run the newly created migration, both from a running database and from an empty database, to ensure consistency.


How do backend tests work?
--------------------------

Backend solution contains Xunit tests, splitted into unit tests, intergrational tests and functional tests.

The `FunctionalTests.Web` project additionally uses the `Verify.Xunit` library. This changes the way we approach verification in our tests. Instead of writing extensive assertions to confirm a test's behavior, `Verify.Xunit` allows us to capture and store the test results in a `.verified` file for easy comparison in future test runs.

For more details about how to create functional tests with `Verify.Xunit`, please refer to the `README.md` file within the `FunctionalTests.Web` project directory.
