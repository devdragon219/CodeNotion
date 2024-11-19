using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.TicketChecklistTemplateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class GetTests : BaseGetTests<TicketChecklistTemplate>
{
  protected override string EntityFragment
  {
    get
    {
      return GraphQLHelper.Fclt.TicketChecklistTemplateFragment(
        includePreventativeData: true,
        includeOnTriggerData: true);
    }
  }

  public GetTests(SeededDbWebFactory factory) : base(factory)
  {
  } 
}
