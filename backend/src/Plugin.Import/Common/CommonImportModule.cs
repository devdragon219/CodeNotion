using Autofac;
using RealGimm.SharedKernel.Interfaces;
using Module = Autofac.Module;
using RealGimm.Core.Common.Interfaces;

namespace RealGimm.Plugin.Import.Common;

public class CommonImportModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder.RegisterType<DefaultCommonDataImporter>()
      .As<IConfigurableModule>()
      .As<IUpstreamDataImporter>();

    builder.RegisterType<DefaultLateCommonDataImporter>()
      .As<IConfigurableModule>()
      .As<IUpstreamDataImporter>();
  }
}
