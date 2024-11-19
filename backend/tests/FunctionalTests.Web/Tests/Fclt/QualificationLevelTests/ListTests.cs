using RealGimm.Core.Fclt.QualificationLevelAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.QualificationLevelTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<QualificationLevel>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.QualificationLevelFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
