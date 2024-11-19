using RealGimm.Core.Fclt.InterventionTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.InterventionTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<InterventionType>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.InterventionTypeFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
