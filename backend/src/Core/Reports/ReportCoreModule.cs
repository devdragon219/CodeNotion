using System.Reflection;
using Autofac;
using RealGimm.Core.Reports.Interfaces;

namespace RealGimm.Core.Reports;

public class ReportCoreModule : Autofac.Module
{
  protected override void Load(ContainerBuilder builder)
  {
    var reportCalculatorsTypes = Assembly
      .GetExecutingAssembly()
      .GetTypes()
      .Where(type => !type.IsAbstract)
      .Where(type => !type.IsInterface)
      .Where(type => typeof(IReportGenerator).IsAssignableFrom(type));

    foreach (var reportCalculatorType in reportCalculatorsTypes)
    {
      builder
        .RegisterType(reportCalculatorType)
        .As<IReportGenerator>()
        .AsSelf()
        .InstancePerLifetimeScope();
    }
  }
}
