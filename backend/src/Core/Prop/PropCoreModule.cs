using Autofac;
using RealGimm.Core.Common.Interfaces;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Core.Prop.Interfaces;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.Core.Prop.Services;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop;

public class PropCoreModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder
      .RegisterType<ContractTypeExportService>()
      .As<IExportService<ContractType>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<ContractTypeCodeSuggestionService>()
      .As<ICodeSuggestor<ContractType>>()
      .InstancePerLifetimeScope();

     builder
      .RegisterType<ContractExportService>()
      .As<IExportService<Contract>>()
      .InstancePerLifetimeScope();
     
    builder
      .RegisterType<ContractCodeSuggestionService>()
      .As<ICodeSuggestor<Contract>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<ContractRevaluationService>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<ContractService>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<ActiveBillExportService>()
      .InstancePerLifetimeScope();
    
    builder
      .RegisterType<PassiveBillExportService>()
      .InstancePerLifetimeScope();
    
    builder
      .RegisterType<ContractStatisticsService>()
      .As<IContractStatisticsService>()
      .InstancePerLifetimeScope();
    
    builder
      .RegisterType<BillCodeSuggestionService>()
      .As<ICodeSuggestor<Bill>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<AdministrationExportService>()
      .As<IExportService<Administration>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<AdministrationTermService>()
      .As<IAdministrationTermService>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<BillPdfGenerator>()
      .As<IPdfGenerator<Bill>>();

    builder
      .RegisterType<BillSepaXmlGenerator>()
      .As<IXmlGenerator<IEnumerable<Bill>>>();

    builder
      .RegisterType<SepaXmlExportConfigurableModule>()
      .As<IConfigurableModule>();

    builder
      .RegisterType<RegistryCommunicationService>()
      .AsSelf();

    builder
      .RegisterType<RegistryCommunicationXmlGenerator>()
      .As<IXmlGenerator<ConfirmedRegistryCommunicationGroupIdWithOffice>>();

    builder
      .RegisterType<BillItemTypeExportService>()
      .As<IExportService<BillItemType>>()
      .InstancePerLifetimeScope();
    
    builder
      .RegisterType<BillItemTypeCodeSuggestionService>()
      .As<ICodeSuggestor<BillItemType>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<BillItemTypeDeleteRestrictionChecker>()
      .As<IDeleteRestrictionChecker<BillItemType>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<RegistryCommunicationService>()
      .AsSelf()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<ConfirmedRegistryCommunicationGroupExportService>()
      .AsSelf()
      .InstancePerDependency();

    builder
      .RegisterType<TemporaryRegistryCommunicationGroupExportService>()
      .AsSelf()
      .InstancePerDependency();

    builder
      .RegisterType<RegistrationPaymentExportService>()
      .As<IExportService<RegistrationPayment>>()
      .InstancePerLifetimeScope();
  }
}
