using RealGimm.Core.Fclt.SLAAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.SLATests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<SLA>
{
  protected override string ModuleName => "sla";
  protected override string EntityFragment => GraphQLHelper.Fclt.SLAFragment(includeConditions: true);

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
