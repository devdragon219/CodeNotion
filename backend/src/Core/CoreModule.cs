using Autofac;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core;

public class CoreModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder.RegisterAssemblyTypes(System.Reflection.Assembly.GetExecutingAssembly())
        .AsClosedTypesOf(typeof(IAccessFilter<>))
        .InstancePerLifetimeScope();
  }
}
