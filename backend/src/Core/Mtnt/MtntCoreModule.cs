using Autofac;
using RealGimm.Core.Mtnt.Interfaces;

namespace RealGimm.Core.Mtnt;

public class MtntCoreModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder.RegisterType<TenantDataSeeder>()
        .As<IDataSeeder>().InstancePerLifetimeScope();
  }
}
