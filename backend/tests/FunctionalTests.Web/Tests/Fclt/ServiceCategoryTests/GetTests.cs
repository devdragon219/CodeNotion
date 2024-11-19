using RealGimm.Core.Fclt.ServiceCategoryAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ServiceCategoryTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<ServiceCategory>
{
  protected override string EntityFragment { get; } = GraphQLHelper.Fclt.ServiceCategoryFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
