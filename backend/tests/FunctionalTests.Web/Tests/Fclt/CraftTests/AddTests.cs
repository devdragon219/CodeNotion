using Ardalis.Specification;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.CraftAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.CraftTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : BaseAddTests<Craft, CraftInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.CraftFragment();
  public override ISpecification<Craft>[] AdditionalSpecifications => [new CraftIncludeAllSpec()];

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override Task<CraftInput> ArrangeAsync(IServiceProvider scopedServices)
  {
    var faker = new CraftInputFaker();
    var input = faker.Generate();

    return Task.FromResult(input);
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    CraftInput input,
    Craft addedEntity)
  {
    AssertHelper.Fclt.CraftEqual(input, addedEntity);
    return Task.CompletedTask;
  }
}
