using RealGimm.Core.Fclt.TicketTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.TicketTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<TicketType>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.TicketTypeFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
