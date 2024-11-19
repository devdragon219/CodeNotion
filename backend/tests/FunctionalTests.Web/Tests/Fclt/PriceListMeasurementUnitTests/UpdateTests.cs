using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListMeasurementUnitTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : BaseUpdateWithIdParameterTests<PriceListMeasurementUnit, PriceListMeasurementUnitInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.PriceListMeasurementUnitFragment();
  public override ISpecification<PriceListMeasurementUnit>[] AdditionalSpecifications => [new PriceListMeasurementUnitIncludeAllSpec()];

  public UpdateTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<(PriceListMeasurementUnit EntityToUpdate, PriceListMeasurementUnitInput Input)> ArrangeAsync(
    IServiceProvider scopedServices)
  {
    var repository = scopedServices.GetRequiredService<IRepository<PriceListMeasurementUnit>>();

    var priceListMeasurementUnitFaker = new PriceListMeasurementUnitFaker();
    var priceListMeasurementUnitToUpdate = priceListMeasurementUnitFaker.Generate();
    await repository.AddAsync(priceListMeasurementUnitToUpdate);

    var inputFaker = new PriceListMeasurementUnitInputFaker();
    var input = inputFaker.Generate();

    return (priceListMeasurementUnitToUpdate, input);
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    PriceListMeasurementUnitInput input,
    PriceListMeasurementUnit updatedEntity)
  {
    AssertHelper.Fclt.PriceListMeasurementUnitEqual(input, updatedEntity);
    return Task.CompletedTask;
  }
}
