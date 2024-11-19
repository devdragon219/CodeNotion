using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.SLATests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class FullListTests : BaseFullListTests<SLA>
{
  protected override string ModuleName => "sla";
  protected override string EntityFragment => GraphQLHelper.Fclt.SLAFragment(includeConditions: true);

  public FullListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
