using System.Reflection;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Web.Anag.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Anag.SubjectTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ExportToExcelTests : BaseGenericExportToExcelTests<Subject>
{
  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo Method => typeof(SubjectQueries).GetMethod(nameof(SubjectQueries.ExportSubjectsToExcel))!;
}
