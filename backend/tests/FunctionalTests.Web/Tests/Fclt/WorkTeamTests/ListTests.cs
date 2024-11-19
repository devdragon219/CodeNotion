using RealGimm.Core.Fclt.WorkTeamAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.WorkTeamTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<WorkTeam>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.WorkTeamFragment(includeWorkers: true);

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
