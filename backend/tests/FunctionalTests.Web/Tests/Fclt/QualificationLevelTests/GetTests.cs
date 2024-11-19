using RealGimm.Core.Fclt.QualificationLevelAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.QualificationLevelTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<QualificationLevel>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.QualificationLevelFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
