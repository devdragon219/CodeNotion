using RealGimm.Core.Common.CityAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Common.CityTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<City>
{
  protected override string MethodName => "city";
  protected override string IdParameterName => "cityId";
  protected override string EntityFragment => GraphQLHelper.Common.CityFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
