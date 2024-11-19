using Autofac;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate.Models;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.Core.Asst.Interfaces;
using RealGimm.Core.Asst.Services;
using RealGimm.Core.Mtnt.Interfaces;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst;

public class AsstCoreModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder.RegisterType<EstateExportService>()
      .As<IExportService<Estate>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<EstateCodeSuggestionService>()
      .As<ICodeSuggestor<Estate>>();

    builder.RegisterType<EstateUnitCodeSuggestionService>()
      .As<ICodeSuggestor<EstateUnit>>();

    builder.RegisterType<EstateSubUnitCodeSuggestionService>()
      .As<ICodeSuggestor<EstateSubUnit>>();

    builder.RegisterType<CadastralUnitCodeSuggestionService>()
      .As<ICodeSuggestor<CadastralUnit>>();

    builder.RegisterType<FunctionAreaCodeSuggestionService>()
      .As<ICodeSuggestor<FunctionArea>>();

    builder.RegisterType<EstateUnitExportService>()
      .As<IExportService<EstateUnit>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<CadastralUnitExportService>()
      .As<IExportService<CadastralUnit>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<EstateSurfacesService>()
      .As<IEstateSurfacesService>()
      .InstancePerLifetimeScope();

    builder.RegisterType<AsstDataSeeder>()
      .As<IModuleDataSeeder>()
      .InstancePerLifetimeScope();

    builder.RegisterType<EstateUnitService>()
      .As<IEstateUnitService>()
      .InstancePerLifetimeScope();

    builder.RegisterType<CadastralUnitHystoricChangeService>()
      .As<ICadastralUnitHystoricChangeService>()
      .InstancePerLifetimeScope();

    builder.RegisterType<FunctionAreaExportService>()
      .As<IExportService<FunctionArea>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<CatalogueItemExportService>()
      .As<IExportService<CatalogueItem>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<CatalogueService>()
      .As<ICatalogueService>()
      .InstancePerLifetimeScope();

    builder.RegisterType<CatalogueTypeExportService>()
      .As<IExportService<CatalogueType>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<CatalogueCategoryCodeSuggestionService>()
      .As<ICodeSuggestor<CatalogueCategory>>();

    builder.RegisterType<CatalogueSubCategoryCodeSuggestionService>()
      .As<ICodeSuggestor<CatalogueSubCategory>>();

    builder.RegisterType<CatalogueTypeCodeSuggestionService>()
      .As<ICodeSuggestor<CatalogueType>>();

    builder.RegisterType<CatalogueItemCodeSuggestionService>()
      .As<ICodeSuggestor<CatalogueItem>>();

    builder
      .RegisterType<EstateOccupationStatisticsService>()
      .As<EstateOccupationStatisticsService>();

    builder
      .RegisterType<EstateUsageTypeExportService>()
      .As<IExportService<EstateUsageType>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<EstateMainUsageTypeExportService>()
      .As<IExportService<EstateMainUsageType>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<EstateUsageTypeSuggestionService>()
      .As<ICodeSuggestor<EstateUsageType>>();

    builder.RegisterType<EstateMainUsageTypeSuggestionService>()
      .As<ICodeSuggestor<EstateMainUsageType>>();

    builder.RegisterType<CadastralLandCategoryCodeSuggestionService>()
      .As<ICodeSuggestor<CadastralLandCategory>>();

    builder
      .RegisterType<CadastralLandCategoryExportService>()
      .As<IExportService<CadastralLandCategory>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<AssetTaxDetailRowExportService>()
      .As<IExportService<AssetTaxDetailRow>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<AssetTaxGroupedRowExportService>()
      .As<IExportService<AssetTaxGroupedRow>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<EstateUnitHistoryService>()
      .AsSelf()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<CatalogueTypeDeleteRestrictionChecker>()
      .As<IDeleteRestrictionChecker<CatalogueType>>()
      .InstancePerLifetimeScope();
  }
}
