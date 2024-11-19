using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListMeasurementUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<PriceListMeasurementUnit>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.PriceListMeasurementUnitFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
