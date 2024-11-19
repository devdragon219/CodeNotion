using Autofac;
using RealGimm.Core.Anag.Interfaces;
using RealGimm.Core.Anag.Services;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Mtnt.Interfaces;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Anag;

public class AnagCoreModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder.RegisterType<SubjectExportService>()
        .As<IExportService<Subject>>()
        .InstancePerLifetimeScope();

    builder.RegisterType<AnagDataSeeder>()
        .As<IModuleDataSeeder>()
        .InstancePerLifetimeScope();

    builder.RegisterType<OrgUnitService>()
        .As<IOrgUnitService>()
        .InstancePerLifetimeScope();

    builder.RegisterType<SubjectCodeSuggestionService>()
        .As<ICodeSuggestor<Subject>>();

    builder.RegisterType<OrgUnitCodeSuggestionService>()
        .As<ICodeSuggestor<OrgUnit>>();

    builder.RegisterType<SubjectUpsertService>()
      .InstancePerLifetimeScope();
  }
}
