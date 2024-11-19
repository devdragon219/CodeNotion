using Autofac;
using RealGimm.Core.Common.Interfaces;
using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Core.IAM.Interfaces;
using RealGimm.Core.IAM.Services;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.Shared.Interfaces;

namespace RealGimm.Core.IAM;

public class IAMCoreModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder
      .RegisterType<UserLoginService>()
      .As<IUserLoginService>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<UserService>()
      .As<IUserService>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<UserCreationService>()
      .As<UserCreationService>()
      .As<IConfigurableModule>()
      .InstancePerLifetimeScope();
    
    builder
      .RegisterType<UserExportService>()
      .As<IExportService<User>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<GroupExportService>()
      .As<IExportService<Group>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<GroupPermissionService>()
      .InstancePerLifetimeScope();
  }
}
