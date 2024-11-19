using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.EstateUnitTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListTests : BasePageableListTests<EstateUnit>
{
  protected override string EntityFragment => GraphQLHelper.Asst.EstateUnitFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
