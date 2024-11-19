using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateMainUsageTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<EstateMainUsageType>
{
  protected override string EntityFragment => GraphQLHelper.Asst.EstateMainUsageTypeFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
