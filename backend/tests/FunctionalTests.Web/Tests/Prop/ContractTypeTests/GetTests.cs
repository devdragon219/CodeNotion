using RealGimm.Core.Prop.ContractTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<ContractType>
{
  protected override string EntityFragment { get; } = GraphQLHelper.Prop.ContractTypeFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
