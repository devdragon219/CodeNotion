using Autofac;
using RealGimm.Core.Mtnt.Interfaces;

namespace RealGimm.Core.Econ;

public class EconCoreModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder.RegisterType<EconDataSeeder>()
      .As<IModuleDataSeeder>()
      .InstancePerLifetimeScope();
  }
}
