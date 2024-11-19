using System.Reflection;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.TicketChecklistTemplateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<TicketChecklistTemplate>
{
  protected override MethodInfo Method => typeof(TicketChecklistTemplateQueries).GetMethod(nameof(TicketChecklistTemplateQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
