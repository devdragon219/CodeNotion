using System.Reflection;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.TicketTypeTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<TicketType>
{
  protected override MethodInfo Method => typeof(TicketTypeQueries).GetMethod(nameof(TicketTypeQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
