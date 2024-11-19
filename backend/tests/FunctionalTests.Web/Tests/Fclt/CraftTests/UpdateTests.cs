using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.CraftAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.CraftTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : BaseUpdateWithIdParameterTests<Craft, CraftInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.CraftFragment();
  public override ISpecification<Craft>[] AdditionalSpecifications => [new CraftIncludeAllSpec()];

  public UpdateTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<(Craft EntityToUpdate, CraftInput Input)> ArrangeAsync(
    IServiceProvider scopedServices)
  {
    var repository = scopedServices.GetRequiredService<IRepository<Craft>>();

    var craftFaker = new CraftFaker();
    var craftToUpdate = craftFaker.Generate();
    await repository.AddAsync(craftToUpdate);

    var inputFaker = new CraftInputFaker();
    var input = inputFaker.Generate();

    return (craftToUpdate, input);
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    CraftInput input,
    Craft updatedEntity)
  {
    AssertHelper.Fclt.CraftEqual(input, updatedEntity);
    return Task.CompletedTask;
  }
}
