using RealGimm.Core.Prop.ContractTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<ContractType>
{
  protected override string EntityFragment => GraphQLHelper.Prop.ContractTypeFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
