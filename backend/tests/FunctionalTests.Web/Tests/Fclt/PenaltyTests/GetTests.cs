using RealGimm.Core.Fclt.PenaltyAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PenaltyTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<Penalty>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.PenaltyFragment(includeConditions: true, includePenalties: true);

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
