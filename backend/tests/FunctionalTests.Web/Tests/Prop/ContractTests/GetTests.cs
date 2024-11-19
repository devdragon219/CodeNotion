using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<Contract>
{
  protected override string MethodName => "contract";
  protected override string IdParameterName => "contractId";
  protected override string EntityFragment { get; } = GraphQLHelper.Prop.Contract.Fragment(includeSublocatedContract: true, includeSubLocations: true);

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
