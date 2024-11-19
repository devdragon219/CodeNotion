using System.Reflection;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.Web.Prop.Queries;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.RegistrationPaymentTests;

[Collection(nameof(SeededDbWebFactoryCollection))]
public class ExportToExcelTests : BaseGenericExportToExcelTests<RegistrationPayment>
{
  public ExportToExcelTests(SeededDbWebFactory factory) : base(factory)
  {
  }

  protected override MethodInfo Method => typeof(RegistrationPaymentQueries).GetMethod(nameof(RegistrationPaymentQueries.ExportToExcel))!;
}
