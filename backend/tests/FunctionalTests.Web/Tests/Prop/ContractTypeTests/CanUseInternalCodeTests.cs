using RealGimm.Core.Prop.ContractTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<ContractType>
{
  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
