using RealGimm.Core.Nrgy.UtilityServiceAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.UtilityServiceTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<UtilityService>
{
  protected override string EntityFragment => GraphQLHelper.Nrgy.UtilityServiceFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
