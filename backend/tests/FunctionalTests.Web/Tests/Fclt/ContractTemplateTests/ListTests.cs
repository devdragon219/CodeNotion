using RealGimm.Core.Fclt.ContractTemplateAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ContractTemplateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<ContractTemplate>
{
  protected override string EntityFragment
  {
    get => GraphQLHelper.Fclt.ContractTemplateFragment(includeSLAs: true, includePenalties: true);
  }

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
