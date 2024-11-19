using RealGimm.Core.Common.InterestRateAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Common.InterestRateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<InterestRate>
{
  protected override string EntityFragment => GraphQLHelper.Common.InterestRateFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
