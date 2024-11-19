using Autofac;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure;

public static class RepositoryUtils
{
  public static void RegisterRepositories(ContainerBuilder builder,
    Type dbContextType,
    Type repositoryType)
  {
    var types = dbContextType
        .GetProperties()
        .Where(p => p.PropertyType.IsGenericType &&
          typeof(DbSet<>).IsAssignableFrom(p.PropertyType.GetGenericTypeDefinition()))
        .Select(p => p.PropertyType.GetGenericArguments().First())
        .ToList();

    foreach (var t in types)
    {
      builder.RegisterType(repositoryType.MakeGenericType(t))
        .As(typeof(IRepository<>).MakeGenericType(t))
        .As(typeof(IReadRepository<>).MakeGenericType(t))
        .InstancePerLifetimeScope();
    }
  }
}
