using RealGimm.Core.Fclt.InterventionTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.InterventionTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<InterventionType>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.InterventionTypeFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
