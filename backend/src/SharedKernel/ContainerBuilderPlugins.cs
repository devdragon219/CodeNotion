using System.Reflection;
using Autofac;

namespace RealGimm.SharedKernel;

public static class ContainerBuilderPlugins
{
  public static void RegisterPlugins(this ContainerBuilder builder)
  {
    foreach (var assembly in Directory.EnumerateFiles(
        Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) ?? ".",
        "RealGimm.Plugin*.dll"
      ))
    {
      builder.RegisterAssemblyModules(Assembly.LoadFile(assembly));
    }
  }
}
