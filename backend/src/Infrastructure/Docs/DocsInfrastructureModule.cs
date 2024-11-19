using Autofac;
using RealGimm.SharedKernel;
using Module = Autofac.Module;
using RealGimm.Infrastructure.Docs.Data;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core;
using RealGimm.Core.Common.Interfaces;

namespace RealGimm.Infrastructure.Docs;

public class DocsInfrastructureModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    if (RuntimeEnv.IsDevelopment(builder.Properties))
    {
      RegisterDevelopmentOnlyDependencies(builder);
    }
    else
    {
      RegisterProductionOnlyDependencies(builder);
    }

    RegisterCommonDependencies(builder);
  }

  private void RegisterCommonDependencies(ContainerBuilder builder)
  {
    builder.RegisterType<CmisSession>()
      .As<IConfigurableModule>()
      .As<CmisSession>()
      .InstancePerLifetimeScope();

    builder.RegisterType<DocsCmisRepository>()
      .As<IRepository<Document>>()
      .As<IReadRepository<Document>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<CmisConfigProvider>()
      .As<ICmisConfigProvider>()
      .InstancePerLifetimeScope();
  }

  private void RegisterDevelopmentOnlyDependencies(ContainerBuilder builder)
  {
    // NOTE: Add any development only services here
  }

  private void RegisterProductionOnlyDependencies(ContainerBuilder builder)
  {
    // NOTE: Add any production only services here
  }
}
