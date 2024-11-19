using RealGimm.Core.Nrgy.CostChargeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.CostChargeTests;
[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<CostCharge>
{
  protected override string EntityFragment => GraphQLHelper.Nrgy.CostChargeFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
