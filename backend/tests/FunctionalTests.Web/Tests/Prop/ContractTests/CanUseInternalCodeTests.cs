using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<Contract>
{
  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
