using Autofac;
using RealGimm.Core.Mtnt.Interfaces;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.CostChargeAggregate.Services;
using RealGimm.Core.Nrgy.Services;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Nrgy;

public class NrgyCoreModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder.RegisterType<NrgyDataSeeder>()
      .As<IModuleDataSeeder>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<UtilityTypeExportService>()
      .As<IExportService<UtilityType>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<UtilityServiceExportService>()
      .As<IExportService<UtilityService>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<CostChargeExportService>()
      .As<IExportService<CostCharge>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<UtilityTypeSuggestionService>()
      .As<ICodeSuggestor<UtilityType>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<CostChargeAnalysisService>()
      .AsSelf()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<UtilityServiceCodeSuggestionService>()
      .As<ICodeSuggestor<UtilityService>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<CostChargeImportService>()
      .AsSelf()
      .InstancePerLifetimeScope();
  }
}
