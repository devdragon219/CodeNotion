using RealGimm.Core.Common.InterestRateAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Common.InterestRateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<InterestRate>
{
  protected override string EntityFragment => GraphQLHelper.Common.InterestRateFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
