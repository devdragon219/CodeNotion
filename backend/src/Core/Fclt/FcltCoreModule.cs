using Autofac;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.EstateUnitGroupAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Core.Fclt.ServiceAggregate;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;
using RealGimm.Core.Fclt.Services;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Core.Mtnt.Interfaces;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt;

public class FcltCoreModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder
      .RegisterType<FcltDataSeeder>()
      .As<IModuleDataSeeder>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<ContractCodeSuggestionService>()
      .As<ICodeSuggestor<Contract>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<EstateUnitGroupCodeSuggestionService>()
      .As<ICodeSuggestor<EstateUnitGroup>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<SLACodeSuggestionService>()
      .As<ICodeSuggestor<SLA>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<ContractTypeCodeSuggestionService>()
      .As<ICodeSuggestor<ContractType>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<ContractTemplateCodeSuggestionService>()
      .As<ICodeSuggestor<ContractTemplate>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<CraftCodeSuggestionService>()
      .As<ICodeSuggestor<Craft>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<InterventionTypeCodeSuggestionService>()
      .As<ICodeSuggestor<InterventionType>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<QualificationLevelCodeSuggestionService>()
      .As<ICodeSuggestor<QualificationLevel>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<TicketTypeCodeSuggestionService>()
      .As<ICodeSuggestor<TicketType>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<WorkTeamCodeSuggestionService>()
      .As<ICodeSuggestor<WorkTeam>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<PenaltyCodeSuggestionService>()
      .As<ICodeSuggestor<Penalty>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<PriceListMeasurementUnitCodeSuggestionService>()
      .As<ICodeSuggestor<PriceListMeasurementUnit>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<TicketChecklistTemplateCodeSuggestionService>()
      .As<ICodeSuggestor<TicketChecklistTemplate>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<PriceListCodeSuggestionService>()
      .As<ICodeSuggestor<PriceList>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<PriceListArticleCodeSuggestionService>()
      .As<ICodeSuggestor<PriceListArticle>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<TicketCodeSuggestionService>()
      .As<ICodeSuggestor<Ticket>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<TicketChecklistCodeSuggestionService>()
      .As<ICodeSuggestor<TicketChecklist>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<FcltContractTypeExportService>()
      .As<IExportService<ContractType>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<EstateUnitGroupExportService>()
      .As<IExportService<EstateUnitGroup>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<ContractTemplateExportService>()
      .As<IExportService<ContractTemplate>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<CraftExportService>()
      .As<IExportService<Craft>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<InterventionTypeExportService>()
      .As<IExportService<InterventionType>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<QualificationLevelExportService>()
      .As<IExportService<QualificationLevel>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<TicketTypeExportService>()
      .As<IExportService<TicketType>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<WorkTeamExportService>()
      .As<IExportService<WorkTeam>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<CalendarExportService>()
      .As<IExportService<Calendar>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<PenaltyExportService>()
      .As<IExportService<Penalty>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<SLAExportService>()
      .As<IExportService<SLA>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<TicketChecklistTemplateExportService>()
      .As<IExportService<TicketChecklistTemplate>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<PriceListMeasurementUnitExportService>()
      .As<IExportService<PriceListMeasurementUnit>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<PriceListExportService>()
      .As<IExportService<PriceList>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<PriceListArticleExportService>()
      .As<IExportService<PriceListArticle>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<TicketExportService>()
      .As<IExportService<Ticket>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<FcltContractExportService>()
      .As<IExportService<Contract>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<TicketChecklistExportService>()
      .As<IExportService<TicketChecklist>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<DeletedUserNameSuggestionService>()
      .AsSelf()
      .InstancePerLifetimeScope();
    
    builder
      .RegisterType<PriceListArticleImportService>()
      .AsSelf()
      .InstancePerLifetimeScope();
    
    builder
      .RegisterType<TicketConditionChecker>()
      .AsSelf()
      .InstancePerLifetimeScope();
    
    builder
      .RegisterType<ServiceExportService>()
      .As<IExportService<Service>>()
      .InstancePerLifetimeScope();
    
    builder
      .RegisterType<ServiceCategoryExportService>()
      .As<IExportService<ServiceCategory>>()
      .InstancePerLifetimeScope();
  }
}
