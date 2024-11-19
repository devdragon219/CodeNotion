using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateUsageTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<EstateUsageType>
{
  protected override string EntityFragment => GraphQLHelper.Asst.EstateUsageTypeFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
