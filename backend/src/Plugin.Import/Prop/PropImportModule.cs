using Autofac;
using RealGimm.SharedKernel.Interfaces;
using Module = Autofac.Module;
using RealGimm.Core.Common.Interfaces;

namespace RealGimm.Plugin.Import.Prop;

public class PropImportModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder.RegisterType<DefaultPropDataImporter>()
      .As<IConfigurableModule>()
      .As<IUpstreamDataImporter>();

    builder
      .RegisterType<ContractMapper>()
      .InstancePerDependency();

    builder
      .RegisterType<AdministrationMapper>()
      .InstancePerDependency();

    builder
      .RegisterType<CustomPropEnumMapper>()
      .As<ICustomPropEnumMapper>();
  }
}
