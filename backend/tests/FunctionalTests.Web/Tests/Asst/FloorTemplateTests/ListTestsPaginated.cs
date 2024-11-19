using RealGimm.Core.Asst.FloorTemplateAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Asst.FloorTemplateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ListTestsPaginated : BasePageableListTests<FloorTemplate>
{
  protected override string EntityFragment => GraphQLHelper.Asst.FloorTemplateFragment();
  protected override string MethodName => "listFloorTemplatesPaginated";

  public ListTestsPaginated(SeededDbWebFactory factory) : base(factory)
  {
  }
}
