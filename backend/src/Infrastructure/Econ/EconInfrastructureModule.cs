using Autofac;
using RealGimm.Infrastructure.Econ.Data;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.Extensions.Configuration;
using Module = Autofac.Module;

namespace RealGimm.Infrastructure.Econ;

public class EconInfrastructureModule : Module
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
      typeof(EconDbContext),
      typeof(EconEfRepository<>)
    );

    builder.RegisterType<EconFilterInterceptor>()
      .InstancePerLifetimeScope();

    builder.RegisterType<EconDbContext>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<EconDemoDataFiller>()
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
