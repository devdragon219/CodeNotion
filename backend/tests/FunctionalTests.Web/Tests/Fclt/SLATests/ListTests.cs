using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.SLATests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<SLA>
{
  protected override string ModuleName => "sla";
  protected override string EntityFragment => GraphQLHelper.Fclt.SLAFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
