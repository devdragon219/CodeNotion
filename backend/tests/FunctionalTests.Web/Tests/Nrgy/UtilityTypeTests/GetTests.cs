using RealGimm.Core.Nrgy.UtilityTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.UtilityTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<UtilityType>
{
  protected override string EntityFragment => GraphQLHelper.Nrgy.UtilityTypeFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
