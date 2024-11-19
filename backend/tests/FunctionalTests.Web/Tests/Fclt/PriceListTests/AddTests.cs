using Ardalis.Specification;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Fclt.PriceListAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PriceListTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : BaseAddTests<PriceList, PriceListInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.PriceListFragment();
  public override ISpecification<PriceList>[] AdditionalSpecifications => [new PriceListIncludeAllSpec()];

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override Task<PriceListInput> ArrangeAsync(IServiceProvider scopedServices)
  {
    var faker = new PriceListInputFaker();
    var input = faker.Generate();

    return Task.FromResult(input);
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    PriceListInput input,
    PriceList addedEntity)
  {
    AssertHelper.Fclt.PriceListEqual(input, addedEntity);
    return Task.CompletedTask;
  }
}
