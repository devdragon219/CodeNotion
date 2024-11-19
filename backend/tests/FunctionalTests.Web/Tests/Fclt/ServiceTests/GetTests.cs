using RealGimm.Core.Fclt.ServiceAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ServiceTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<Service>
{
  protected override string EntityFragment { get; } = GraphQLHelper.Fclt.ServiceFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
