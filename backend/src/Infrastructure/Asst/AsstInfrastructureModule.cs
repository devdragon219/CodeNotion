using Autofac;
using RealGimm.Infrastructure.Asst.Data;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.Extensions.Configuration;
using Module = Autofac.Module;
using RealGimm.Core.Common.Interfaces;

namespace RealGimm.Infrastructure.Asst;

public class AsstInfrastructureModule : Module
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
      typeof(AsstDbContext),
      typeof(AsstEfRepository<>)
    );

    builder.RegisterType<AsstFilterInterceptor>()
      .InstancePerLifetimeScope();

    builder.RegisterType<AsstDbContext>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<AsstDemoDataFiller>()
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
