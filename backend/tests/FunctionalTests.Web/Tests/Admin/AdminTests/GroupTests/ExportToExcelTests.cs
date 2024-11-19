using System.Reflection;
using RealGimm.Web.Admin.Queries;
using RealGimm.Core.IAM.GroupAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Admin.AdminTests.GroupTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ExportToExcelTests : BaseGenericExportToExcelTests<Group>
{
  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo Method => typeof(AdminQueries).GetMethod(nameof(AdminQueries.ExportGroupsToExcel))!;
}
