using RealGimm.Core.Fclt.ContractAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ContractTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<Contract>
{
  protected override string ModuleName => "fcltContract";
  protected override string MethodName => "listFcltContracts";
  protected override string EntityFragment => GraphQLHelper.Fclt.ContractFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
