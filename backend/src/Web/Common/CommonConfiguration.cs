using HotChocolate.Execution.Configuration;
using RealGimm.Core.Common.NotificationAggregate;
using RealGimm.Core.Reports;
using RealGimm.Core.Taxes.ItaILIA;
using RealGimm.Core.Taxes.ItaIMU;
using RealGimm.Core.Taxes.SubTables;
using RealGimm.Core.Taxes.Tables;
using RealGimm.Web.Common.Extensions;

namespace RealGimm.Web.Common;

public class CommonConfiguration
{
  public static void AddGqlConfig(IRequestExecutorBuilder services)
  {
    services
      .AddType<EstatePortfolioExportIsReadyNotification>()
      .AddType<ContractsExpirationNotification>()
      .AddType<CostChargesExpirationNotification>()
      .AddType<DocumentExpiredNotification>()
      .AddType<SubjectDocumentExpiredNotification>()
      .AddType<EstateDocumentExpiredNotification>()
      .AddType<EstateUnitDocumentExpiredNotification>()
      .AddType<CatalogueItemDocumentExpiredNotification>()
      .AddType<ContractDocumentExpiredNotification>()
      .AddType<PasswordExpirationNotification>()
      .AddType<ItaIMUConfiguration>()
      .AddType<ItaILIAConfiguration>()
      .AddType<TaxConfigGroupedRow>()
      .AddType<TaxConfigGenericRow>()
      .AddType<TaxConfigCoefficientSubTableRow>()
      .AddType<TaxConfigRateSubTableRow>()
      .AddTypeExtension<CommonQueries>()
      .AddTypeExtension<CommonMutations>()
      .AddTypeExtension<OrgUnitExtension>()
      .AddTypeExtension<AddressesExtension>()
      .AddTypeExtension<CommonSubscriptions>()
      .AddTypeExtension<BillItemTypeExtension>()
      .AddEnumType<ReportFormat>(config =>
      {
        foreach (var format in ReportFormat.List)
        {
          config.Value(format).Name(format.Name.ToUpperInvariant());
        }
      });
  }
}
