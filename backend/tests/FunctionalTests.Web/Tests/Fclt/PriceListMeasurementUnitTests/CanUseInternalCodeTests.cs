using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListMeasurementUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<PriceListMeasurementUnit>
{
  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
