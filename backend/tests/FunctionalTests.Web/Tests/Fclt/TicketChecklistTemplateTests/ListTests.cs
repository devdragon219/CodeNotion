using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.TicketChecklistTemplateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ListTests : BasePageableListTests<TicketChecklistTemplate>
{
  protected override string EntityFragment => GraphQLHelper.Fclt.TicketChecklistTemplateFragment();

  public ListTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
