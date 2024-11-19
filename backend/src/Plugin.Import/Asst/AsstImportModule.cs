using Autofac;
using RealGimm.SharedKernel.Interfaces;
using Module = Autofac.Module;
using RealGimm.Core.Common.Interfaces;

namespace RealGimm.Plugin.Import.Asst;

public class AsstImportModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder.RegisterType<DefaultAsstDataImporter>()
      .As<IConfigurableModule>()
      .As<IUpstreamDataImporter>();

    builder.RegisterType<DefaultLateAsstDataImporter>()
      .As<IConfigurableModule>()
      .As<IUpstreamDataImporter>();

    builder
      .RegisterType<EstateMapper>()
      .InstancePerDependency();

    builder
      .RegisterType<EstateUnitMapper>()
      .InstancePerDependency();

    builder
      .RegisterType<EstateSubUnitMapper>()
      .InstancePerDependency();

    builder
      .RegisterType<CustomEstateEnumMapper>()
      .As<ICustomEstateEnumMapper>();

    builder
      .RegisterType<CadastralUnitMapper>()
      .InstancePerDependency();
  }
}
