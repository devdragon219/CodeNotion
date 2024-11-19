using System.Reflection;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Web.Admin.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Admin.AdminTests.UserTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ExportToExcelTests : BaseGenericExportToExcelTests<User>
{
  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo Method => typeof(AdminQueries).GetMethod(nameof(AdminQueries.ExportToExcel))!;
}
