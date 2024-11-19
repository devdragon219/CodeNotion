using RealGimm.Core.Fclt.PenaltyAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.PenaltyTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<Penalty>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.PenaltyFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
