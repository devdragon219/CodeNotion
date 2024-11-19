using RealGimm.Core.Asst.EstateSubUnitAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateSubUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<EstateSubUnit>
{
  protected override string EntityFragment => GraphQLHelper.Asst.EstateSubUnitFragment(includeEstateUnit: true, includeUsageType: true);

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
