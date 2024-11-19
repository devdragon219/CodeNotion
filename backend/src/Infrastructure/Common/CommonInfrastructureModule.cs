using Autofac;
using RealGimm.Infrastructure.Common.Data;
using RealGimm.Infrastructure.Common.CityProvider;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using Module = Autofac.Module;
using RealGimm.Core.Common.Interfaces;
using RealGimm.Infrastructure.Common.Geocoding;
using RealGimm.Core.Common;
using RealGimm.Infrastructure.Common.RegistrationOfficeProvider;
using RealGimm.Infrastructure.Common.InterestRateProvider;
using RealGimm.Infrastructure.Common.RevaluationDataProvider;

namespace RealGimm.Infrastructure.Common;

public class CommonInfrastructureModule : Module
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
      typeof(CommonDbContext),
      typeof(CommonEfRepository<>)
    );

    builder.RegisterType<CommonDbContext>()
      .InstancePerLifetimeScope();

    builder
      .RegisterInstance<IAuditConfigurator>(new AuditConfigurator());

    builder
      .RegisterType<CommonDemoDataFiller>()
      .As<IDemoDataFiller>();

    builder.RegisterType<IstatCityProvider>()
      .As<ICityProvider>()
      .InstancePerLifetimeScope();

    builder.RegisterType<RegOfficeProviderIta>()
      .As<IRegistrationOfficeProvider>()
      .InstancePerLifetimeScope();
      
    builder.RegisterType<CommonFilterInterceptor>()
      .InstancePerLifetimeScope();

    builder.RegisterType<InterestRateProviderIta>()
      .As<IInterestRateProvider>()
      .InstancePerLifetimeScope();

    builder.RegisterType<RevaluationDataProviderIta>()
      .As<IRevaluationDataProvider>()
      .InstancePerLifetimeScope();

    builder.RegisterType<NominatimResolver>()
      .As<IConfigurableModule>()
      .As<IGeocodingResolver>()
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
