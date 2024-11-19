using RealGimm.Core.Prop.BillItemTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Common.BillItemTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<BillItemType>
{
  protected override string EntityFragment => GraphQLHelper.Common.BillItemTypeFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
