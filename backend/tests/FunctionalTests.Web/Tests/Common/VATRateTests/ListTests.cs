using RealGimm.Core.Common.VATRateAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Common.VATRateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<VATRate>
{
  protected override string EntityFragment => GraphQLHelper.Common.VATRateFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
