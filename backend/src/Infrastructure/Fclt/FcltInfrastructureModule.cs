using Autofac;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using Module = Autofac.Module;
using RealGimm.Infrastructure.Fclt.Data;

namespace RealGimm.Infrastructure.Fclt;

public class FcltInfrastructureModule : Module
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
      typeof(FcltDbContext),
      typeof(FcltEfRepository<>)
    );

    builder.RegisterType<FcltFilterInterceptor>()
      .InstancePerLifetimeScope();

    builder.RegisterType<FcltDbContext>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<FcltDemoDataFiller>()
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
