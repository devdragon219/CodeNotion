using System.Reflection;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.QualificationLevelTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<QualificationLevel>
{
  protected override MethodInfo Method => typeof(QualificationLevelQueries).GetMethod(nameof(QualificationLevelQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
