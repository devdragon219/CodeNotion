using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.InterventionTypeTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : BaseUpdateWithIdParameterTests<InterventionType, InterventionTypeInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.InterventionTypeFragment();
  public override ISpecification<InterventionType>[] AdditionalSpecifications => [new InterventionTypeIncludeAllSpec()];

  public UpdateTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<(InterventionType EntityToUpdate, InterventionTypeInput Input)> ArrangeAsync(
    IServiceProvider scopedServices)
  {
    var repository = scopedServices.GetRequiredService<IRepository<InterventionType>>();

    var interventionTypeFaker = new InterventionTypeFaker();
    var interventionTypeToUpdate = interventionTypeFaker.Generate();
    await repository.AddAsync(interventionTypeToUpdate);

    var inputFaker = new InterventionTypeInputFaker();
    var input = inputFaker.Generate();

    return (interventionTypeToUpdate, input);
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    InterventionTypeInput input,
    InterventionType updatedEntity)
  {
    AssertHelper.Fclt.InterventionTypeEqual(input, updatedEntity);
    return Task.CompletedTask;
  }
}
