using RealGimm.Core.Fclt.TicketTypeAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.TicketTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<TicketType>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.TicketTypeFragment();

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
