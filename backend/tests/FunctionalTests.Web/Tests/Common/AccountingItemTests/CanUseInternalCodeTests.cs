using RealGimm.Core.Common.AccountingItemAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Common.AccountingItemTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<AccountingItem>
{
  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
