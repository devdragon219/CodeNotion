using RealGimm.Core.Prop.BillItemTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Common.BillItemTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<BillItemType>
{
  protected override string EntityFragment => GraphQLHelper.Common.BillItemTypeFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
