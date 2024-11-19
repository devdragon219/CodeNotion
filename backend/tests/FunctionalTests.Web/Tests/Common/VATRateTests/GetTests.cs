using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Common.VATRateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<VATRate>
{
  protected override string EntityFragment { get; } = GraphQLHelper.Prop.VATRateFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
