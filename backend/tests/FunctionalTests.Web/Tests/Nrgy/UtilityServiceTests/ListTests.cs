using RealGimm.Core.Nrgy.UtilityServiceAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.UtilityServiceTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<UtilityService>
{
  protected override string EntityFragment => GraphQLHelper.Nrgy.UtilityServiceFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
