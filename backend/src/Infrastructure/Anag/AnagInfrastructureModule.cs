using Autofac;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;
using Module = Autofac.Module;
using RealGimm.Core.Common.Interfaces;

namespace RealGimm.Infrastructure.Anag;

public class AnagInfrastructureModule : Module
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
      .ForContext<AnagDbContext>(config =>
        config
          .ForEntity<Subject>(
            _ => _.Override(s => s.Name, Constants.REDACTED_FIELD)
          )
          .ForEntity<LegalSubject>(
            _ => _.Override(s => s.FullName, Constants.REDACTED_FIELD)
          )
          .ForEntity<ManagementSubject>(
            _ => _.Override(s => s.FullName, Constants.REDACTED_FIELD)
          )
          .ForEntity<PhysicalSubject>(
            _ => _
              .Override(s => s.FirstName, Constants.REDACTED_FIELD)
              .Override(s => s.LastName, Constants.REDACTED_FIELD)
              .Override(s => s.BirthCountryTaxIdCode, Constants.REDACTED_FIELD)
              .Override(s => s.BirthLocation, Constants.REDACTED_FIELD)
          )
      );
  }

  private static void RegisterCommonDependencies(ContainerBuilder builder)
  {
    RepositoryUtils.RegisterRepositories(
      builder,
      typeof(AnagDbContext),
      typeof(AnagEfRepository<>)
    );

    builder.RegisterType<AnagFilterInterceptor>()
      .InstancePerLifetimeScope();

    builder.RegisterType<AnagDbContext>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<AnagDemoDataFiller>()
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
