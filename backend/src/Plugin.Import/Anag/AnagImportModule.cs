using Autofac;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using Module = Autofac.Module;
using RealGimm.Core.Common.Interfaces;

namespace RealGimm.Plugin.Import.Anag;

public class AnagImportModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder.RegisterType<DefaultAnagDataImporter>()
      .As<IConfigurableModule>()
      .As<IUpstreamDataImporter>();

    builder.RegisterType<SubjectMapper>()
      .InstancePerDependency();
  }
}
