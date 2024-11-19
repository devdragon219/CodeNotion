using RealGimm.Core.Fclt.ContractAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ContractTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<Contract>
{
  protected override string ModuleName => "fcltContract";
  protected override string EntityFragment => GraphQLHelper.Fclt.ContractFragment(includeDetails: true);

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
