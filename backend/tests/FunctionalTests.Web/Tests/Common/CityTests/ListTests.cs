using RealGimm.Core.Common.CityAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Common.CityTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListTests : BasePageableListTests<City>
{
  protected override string EntityFragment => GraphQLHelper.Common.CityFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
