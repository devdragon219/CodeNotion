using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.TicketChecklistTemplateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class CanUseInternalCodeTests : BaseCanUseInternalCodeTests<TicketChecklistTemplate>
{
  public CanUseInternalCodeTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
