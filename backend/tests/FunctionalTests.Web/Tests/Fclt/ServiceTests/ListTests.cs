using RealGimm.Core.Fclt.ServiceAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ServiceTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListTests : BasePageableListTests<Service>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.ServiceFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
