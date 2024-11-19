using System.Reflection;
using Autofac;
using RealGimm.Core.Common.Interfaces;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Infrastructure.EMail;
using Module = Autofac.Module;
using RealGimm.Core.EventSystem;
using RealGimm.Infrastructure.MessageBus;

namespace RealGimm.Infrastructure;

public class InfrastructureModule : Module
{
  private readonly List<Assembly> _assemblies = [];

  public InfrastructureModule()
  {
    var coreAssembly =
      Assembly.GetAssembly(typeof(IEmailSender));

    var infrastructureAssembly = Assembly.GetAssembly(typeof(InfrastructureModule));
    if (coreAssembly != null)
    {
      _assemblies.Add(coreAssembly);
    }

    if (infrastructureAssembly != null)
    {
      _assemblies.Add(infrastructureAssembly);
    }
  }

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

  private static void RegisterCommonDependencies(ContainerBuilder builder)
  {
    builder
      .RegisterType<DomainEventDispatcher>()
      .As<IDomainEventDispatcher>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<TenantPreparer>()
      .As<ITenantPreparer>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<InfrastructurePreparer>()
      .As<IInfrastructurePreparer>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<MigrationService>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<SingleTenantHandler>()
      .As<ISingleTenantHandler>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<RebusConfigurator>()
      .As<IRebusConfigurator>()
      .InstancePerLifetimeScope();
  }

  private static void RegisterDevelopmentOnlyDependencies(ContainerBuilder builder)
  {
    // NOTE: Add any development only services here
    builder.RegisterType<FakeEmailSender>().As<IEmailSender>()
      .InstancePerLifetimeScope();
  }

  private static void RegisterProductionOnlyDependencies(ContainerBuilder builder)
  {
    // NOTE: Add any production only services here
    builder.RegisterType<SmtpEmailSender>().As<IEmailSender>()
      .InstancePerLifetimeScope();
  }
}
