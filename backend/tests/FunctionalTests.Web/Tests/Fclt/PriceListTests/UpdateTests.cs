using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Fclt.PriceListAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : BaseUpdateWithIdParameterTests<PriceList, PriceListInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.PriceListFragment();
  public override ISpecification<PriceList>[] AdditionalSpecifications => [new PriceListIncludeAllSpec()];

  public UpdateTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<(PriceList EntityToUpdate, PriceListInput Input)> ArrangeAsync(
    IServiceProvider scopedServices)
  {
    var repository = scopedServices.GetRequiredService<IRepository<PriceList>>();

    var priceListFaker = new PriceListFaker();
    var priceListToUpdate = priceListFaker.Generate();
    await repository.AddAsync(priceListToUpdate);

    var inputFaker = new PriceListInputFaker();
    var input = inputFaker.Generate();

    return (priceListToUpdate, input);
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    PriceListInput input,
    PriceList updatedEntity)
  {
    AssertHelper.Fclt.PriceListEqual(input, updatedEntity);
    return Task.CompletedTask;
  }
}
