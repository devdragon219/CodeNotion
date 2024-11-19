using RealGimm.Core.Fclt.ServiceCategoryAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ServiceCategoryTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListTests : BasePageableListTests<ServiceCategory>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.ServiceCategoryFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
