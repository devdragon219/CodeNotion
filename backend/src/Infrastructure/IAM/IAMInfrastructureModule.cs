using Autofac;
using RealGimm.Infrastructure.IAM.Data;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.IAM.UserAggregate;
using Module = Autofac.Module;
using RealGimm.Infrastructure.IAM.DataGenerator;
using RealGimm.Infrastructure.IAM.LoginLocationProvider;

namespace RealGimm.Infrastructure.IAM;

public class IAMInfrastructureModule : Module
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

    Audit.EntityFramework.Configuration.Setup()
      .ForContext<IAMDbContext>(config =>
        config
          .ForEntity<User>(
            _ => _.Override(s => s.PasswordHash, Constants.REDACTED_FIELD)
          )
          .ForEntity<Session>(
            _ => _.Override(s => s.RefreshToken, Constants.REDACTED_FIELD)
          )
      );
  }

  private void RegisterCommonDependencies(ContainerBuilder builder)
  {
    RepositoryUtils.RegisterRepositories(
      builder,
      typeof(IAMDbContext),
      typeof(IAMEfRepository<>)
    );

    builder.RegisterType<IAMDbContext>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<IAMDemoDataFiller>()
      .As<IDemoDataFiller>();

    builder
      .RegisterType<Users>()
      .As<IUserDataGenerator>();

    builder
      .RegisterType<Passwords>()
      .As<IPasswordAndHashGenerator>();

    builder
      .RegisterType<JWTVerifier>()
      .As<IJWTVerifier>();

    builder
      .RegisterType<DefaultLoginLocationProvider>()
      .As<INetLocationProvider>()
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