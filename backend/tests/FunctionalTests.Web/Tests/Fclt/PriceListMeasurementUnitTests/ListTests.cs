using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListMeasurementUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<PriceListMeasurementUnit>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.PriceListMeasurementUnitFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
