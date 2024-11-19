using Ardalis.Specification;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.InterventionTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : BaseAddTests<InterventionType, InterventionTypeInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.InterventionTypeFragment();
  public override ISpecification<InterventionType>[] AdditionalSpecifications => [new InterventionTypeIncludeAllSpec()];

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override Task<InterventionTypeInput> ArrangeAsync(IServiceProvider scopedServices)
  {
    var faker = new InterventionTypeInputFaker();
    var input = faker.Generate();

    return Task.FromResult(input);
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    InterventionTypeInput input,
    InterventionType addedEntity)
  {
    AssertHelper.Fclt.InterventionTypeEqual(input, addedEntity);
    return Task.CompletedTask;
  }
}
