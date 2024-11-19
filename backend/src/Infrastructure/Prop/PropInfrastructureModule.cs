using Autofac;
using RealGimm.Infrastructure.Prop.Data;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.Extensions.Configuration;
using Module = Autofac.Module;
using RealGimm.Infrastructure.Asst.Data;
using RealGimm.Core.Common.Interfaces;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.Core.Shared.Interfaces;

namespace RealGimm.Infrastructure.Prop;

public class PropInfrastructureModule : Module
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
    RepositoryUtils.RegisterRepositories(
      builder,
      typeof(PropDbContext),
      typeof(PropEfRepository<>)
    );
    
    builder.RegisterType<PropFilterInterceptor>()
      .InstancePerLifetimeScope();

    builder.RegisterType<PropDbContext>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<PropDemoDataFiller>()
      .As<IDemoDataFiller>();
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
