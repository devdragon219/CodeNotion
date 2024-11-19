using System.Reflection;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.CalendarTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<Calendar>
{
  protected override MethodInfo Method => typeof(CalendarQueries).GetMethod(nameof(CalendarQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
