using Autofac;
using RealGimm.Web;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.IntegrationTests;

public class MutationTestBase
{
  protected readonly IContainer _container;

  public MutationTestBase()
  {
    var cb = new ContainerBuilder();

    cb.RegisterAssemblyTypes(typeof(Auth).Assembly)
        .AsClosedTypesOf(typeof(IMapper<,>))
        .InstancePerLifetimeScope();

    cb.RegisterType<Mapper>()
        .As<IMapper>()
        .InstancePerLifetimeScope();

    _container = cb.Build();
  }
}
