using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateUsageTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<EstateUsageType>
{
  protected override string EntityFragment => GraphQLHelper.Asst.EstateUsageTypeFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
