using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<Contract>
{
  protected override string EntityFragment => GraphQLHelper.Prop.Contract.ListFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
