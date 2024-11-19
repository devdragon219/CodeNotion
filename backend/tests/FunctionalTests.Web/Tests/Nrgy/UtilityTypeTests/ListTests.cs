using RealGimm.Core.Nrgy.UtilityTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Nrgy.UtilityTypeTests;
[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<UtilityType>
{
  protected override string EntityFragment => GraphQLHelper.Nrgy.UtilityTypeFragment();
  protected override string MethodName => "listUtilityType";

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
