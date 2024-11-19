using RealGimm.Core.Fclt.ContractTemplateAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ContractTemplateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<ContractTemplate>
{
  protected override string EntityFragment
  {
    get => GraphQLHelper.Fclt.ContractTemplateFragment(includeSLAs: true, includePenalties: true);
  }

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
