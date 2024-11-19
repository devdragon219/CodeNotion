using Autofac;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Common.CityAggregate.Tasks;
using RealGimm.Core.Common.InterestRateAggregate;
using RealGimm.Core.Common.RevaluationDataAggregate;
using RealGimm.Core.Common.Services;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Mtnt.Interfaces;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Common;

public class CommonCoreModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder
      .RegisterType<CityUpdate>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<VATRateExportService>()
      .As<IExportService<VATRate>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<InterestRateExportService>()
      .As<IExportService<InterestRate>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<VATRateCodeSuggestionService>()
      .As<ICodeSuggestor<VATRate>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<AccountingItemExportService>()
      .As<IExportService<AccountingItem>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<AccountingItemCodeSuggestionService>()
      .As<ICodeSuggestor<AccountingItem>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<RevaluationDataExportService>()
      .As<IExportService<RevaluationData>>()
      .InstancePerLifetimeScope();
    
    builder
      .RegisterType<VATRateDeleteRestrictionChecker>()
      .As<IDeleteRestrictionChecker<VATRate>>()
      .InstancePerLifetimeScope();
    
    builder
      .RegisterType<AccountingItemDeleteRestrictionChecker>()
      .As<IDeleteRestrictionChecker<AccountingItem>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<CommonDataSeeder>()
      .As<IModuleDataSeeder>()
      .InstancePerLifetimeScope();
  }
}
