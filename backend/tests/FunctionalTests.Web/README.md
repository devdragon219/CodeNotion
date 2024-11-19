FunctionalTests.Web
===================

This test project uses the `Verify.Xunit` library, which changes the way we approach verification in our tests.


Annotations
-----------

Each test that uses the `Verify` method should be marked with the `[UsesVerify]` attribute to indicate its special verification mechanism.


.verified Files
---------------

When you run a test that uses the `Verify` method for the first time, it captures the result and stores it in a `.verified` file. This file acts as the "source of truth" for that particular test. In subsequent runs, the new test result is compared against the `.verified` file. If they match, the test passes; otherwise, it fails.


Naming
------

The `.verified` files are automatically named based on the test method's name. Make sure to give your test methods descriptive names to keep track of the corresponding `.verified` files easily.
