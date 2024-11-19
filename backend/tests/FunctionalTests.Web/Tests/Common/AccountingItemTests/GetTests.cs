using RealGimm.Core.Common.AccountingItemAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Common.AccountingItemTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<AccountingItem>
{
  protected override string EntityFragment => GraphQLHelper.Common.AccountingItemFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
