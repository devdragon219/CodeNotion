using RealGimm.Core.Fclt.PenaltyAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PenaltyTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class FullListTests : BaseFullListTests<Penalty>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.PenaltyFragment(includeConditions: true, includePenalties: true);

  public FullListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
