using RealGimm.Core.Common.AccountingItemAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Common.AccountingItemTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<AccountingItem>
{
  protected override string EntityFragment => GraphQLHelper.Common.AccountingItemFragment();
  protected override string MethodName => "listAccountingTypes";

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
