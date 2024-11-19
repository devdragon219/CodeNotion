using RealGimm.Core.Asst.FloorTemplateAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.FloorTemplateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<FloorTemplate>
{
  protected override string MethodName => "floorTemplate";
  protected override string EntityFragment => GraphQLHelper.Asst.FloorTemplateFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
