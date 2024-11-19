using System.Reflection;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Web.Fclt.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Fclt.ContractTemplateTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<ContractTemplate>
{
  protected override MethodInfo Method => typeof(ContractTemplateQueries).GetMethod(nameof(ContractTemplateQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
