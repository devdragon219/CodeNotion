using Ardalis.Specification;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Core.Fclt.QualificationLevelAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Infrastructure.Fclt.Data.Fakers;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.QualificationLevelTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class UpdateTests : BaseUpdateWithIdParameterTests<QualificationLevel, QualificationLevelInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.QualificationLevelFragment();
  public override ISpecification<QualificationLevel>[] AdditionalSpecifications => [new QualificationLevelIncludeAllSpec()];

  public UpdateTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override async Task<(QualificationLevel EntityToUpdate, QualificationLevelInput Input)> ArrangeAsync(
    IServiceProvider scopedServices)
  {
    var repository = scopedServices.GetRequiredService<IRepository<QualificationLevel>>();

    var qualificationLevelFaker = new QualificationLevelFaker();
    var qualificationLevelToUpdate = qualificationLevelFaker.Generate();
    await repository.AddAsync(qualificationLevelToUpdate);

    var inputFaker = new QualificationLevelInputFaker();
    var input = inputFaker.Generate();

    return (qualificationLevelToUpdate, input);
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    QualificationLevelInput input,
    QualificationLevel updatedEntity)
  {
    AssertHelper.Fclt.QualificationLevelEqual(input, updatedEntity);
    return Task.CompletedTask;
  }
}
