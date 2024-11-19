using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateMainUsageTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<EstateMainUsageType>
{
  protected override string EntityFragment => GraphQLHelper.Asst.EstateMainUsageTypeFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
