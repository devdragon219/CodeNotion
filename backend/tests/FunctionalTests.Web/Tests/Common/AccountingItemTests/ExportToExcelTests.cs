using System.Reflection;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Web.Common.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Common.AccountingItemTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public sealed class ExportToExcelTests : BaseGenericExportToExcelTests<AccountingItem>
{
  protected override MethodInfo Method => typeof(AccountingItemQueries).GetMethod(nameof(AccountingItemQueries.ExportToExcel))!;

  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }
}
