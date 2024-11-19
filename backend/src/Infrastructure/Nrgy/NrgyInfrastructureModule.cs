using Autofac;
using RealGimm.Infrastructure.Nrgy.Data;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using Module = Autofac.Module;

namespace RealGimm.Infrastructure.Nrgy;

public class NrgyInfrastructureModule : Module
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
      typeof(NrgyDbContext),
      typeof(NrgyEfRepository<>)
    );

    builder.RegisterType<NrgyFilterInterceptor>()
      .InstancePerLifetimeScope();

    builder.RegisterType<NrgyDbContext>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<NrgyDemoDataFiller>()
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
