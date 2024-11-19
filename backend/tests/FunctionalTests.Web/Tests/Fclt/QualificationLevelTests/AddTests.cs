using Ardalis.Specification;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Core.Fclt.QualificationLevelAggregate.Specifications;
using RealGimm.FunctionalTests.Web.Fakers.Fclt;
using RealGimm.Web.Fclt.Models;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.QualificationLevelTests;

[Collection(nameof(EmptyDbWebFactoryCollection))]
public sealed class AddTests : BaseAddTests<QualificationLevel, QualificationLevelInput>
{
  public override string EntityFragment => GraphQLHelper.Fclt.QualificationLevelFragment();
  public override ISpecification<QualificationLevel>[] AdditionalSpecifications => [new QualificationLevelIncludeAllSpec()];

  public AddTests(EmptyDbWebFactory factory) : base(factory)
  {
  }

  protected override Task<QualificationLevelInput> ArrangeAsync(IServiceProvider scopedServices)
  {
    var faker = new QualificationLevelInputFaker();
    var input = faker.Generate();

    return Task.FromResult(input);
  }

  protected override Task AssertAsync(
    IServiceProvider scopedServices,
    QualificationLevelInput input,
    QualificationLevel addedEntity)
  {
    AssertHelper.Fclt.QualificationLevelEqual(input, addedEntity);
    return Task.CompletedTask;
  }
}
