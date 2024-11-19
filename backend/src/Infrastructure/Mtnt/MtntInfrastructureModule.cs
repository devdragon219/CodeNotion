using Autofac;
using RealGimm.Infrastructure.Mtnt.Data;
using RealGimm.SharedKernel;
using RealGimm.Infrastructure.Mtnt.IAM;
using RealGimm.Core.Mtnt.Interfaces;
using Module = Autofac.Module;

namespace RealGimm.Infrastructure.Mtnt;

public class MtntInfrastructureModule : Module
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
      typeof(MtntDbContext),
      typeof(MtntEfRepository<>)
    );

    builder.RegisterType<MtntDbContext>()
      .InstancePerLifetimeScope();

    builder.RegisterType<LoginProvider>().As<ILoginProvider>();
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
