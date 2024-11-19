using RealGimm.Core.Fclt.WorkTeamAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.WorkTeamTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<WorkTeam>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.WorkTeamFragment(includeWorkers: true);

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
