using Autofac;
using RealGimm.Core.Docs.DocumentAggregate.Models;
using RealGimm.Core.Docs.Interfaces;
using RealGimm.Core.Docs.Services;
using RealGimm.Core.Shared.Interfaces;

namespace RealGimm.Core.Docs;

public class DocsCoreModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder.RegisterType<DocumentService>()
      .As<IDocumentService>()
      .InstancePerLifetimeScope();

    builder.RegisterType<EstatePortfolioService>()
      .As<IEstatePortfolioService>()
      .InstancePerLifetimeScope();

    builder.RegisterType<DocumentExportService>()
      .As<IExportService<DocumentRow>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<SubjectDocumentsExportService>()
      .As<IExportService<SubjectDocumentsFlatOutput>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<EstateDocumentsExportService>()
      .As<IExportService<EstateDocumentsFlatOutput>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<EstateUnitDocumentsExportService>()
      .As<IExportService<EstateUnitDocumentsFlatOutput>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<CatalogueDocumentsExportService>()
      .As<IExportService<CatalogueDocumentsFlatOutput>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<ContractDocumentsExportService>()
      .As<IExportService<ContractDocumentsFlatOutput>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<TicketDocumentsExportService>()
      .As<IExportService<TicketDocumentsFlatOutput>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<FcltContractDocumentsExportService>()
      .As<IExportService<FcltContractDocumentsFlatOutput>>()
      .InstancePerLifetimeScope();
  }
}
