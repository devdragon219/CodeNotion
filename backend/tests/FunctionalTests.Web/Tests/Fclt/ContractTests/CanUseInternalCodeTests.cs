using RealGimm.Core.Fclt.ContractAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ContractTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<Contract>
{
  protected override string ModuleName => "fcltContract";

  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
