using RealGimm.Core.Fclt.ContractTemplateAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ContractTemplateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<ContractTemplate>
{
  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
