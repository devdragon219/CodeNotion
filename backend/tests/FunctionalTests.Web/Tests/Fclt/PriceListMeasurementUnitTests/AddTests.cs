using Ardalis.Specification;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListMeasurementUnitTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : BaseAddTests<PriceListMeasurementUnit, PriceListMeasurementUnitInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.PriceListMeasurementUnitFragment();
  public override ISpecification<PriceListMeasurementUnit>[] AdditionalSpecifications => [new PriceListMeasurementUnitIncludeAllSpec()];

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override Task<PriceListMeasurementUnitInput> ArrangeAsync(IServiceProvider scopedServices)
  {
    var faker = new PriceListMeasurementUnitInputFaker();
    var input = faker.Generate();

    return Task.FromResult(input);
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    PriceListMeasurementUnitInput input,
    PriceListMeasurementUnit addedEntity)
  {
    AssertHelper.Fclt.PriceListMeasurementUnitEqual(input, addedEntity);
    return Task.CompletedTask;
  }
}
