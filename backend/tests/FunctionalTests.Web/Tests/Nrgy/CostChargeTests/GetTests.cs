using RealGimm.Core.Nrgy.CostChargeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.CostChargeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class GetTests : BaseGetTests<CostCharge>
{
  protected override string EntityFragment => GraphQLHelper.Nrgy.CostChargeFragment(includeFields: true, includeConsumption: true, includeService: true);

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
