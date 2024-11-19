using System.Reflection;
using Autofac;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Taxes.Interfaces;
using RealGimm.Core.Taxes.Services;
using RealGimm.Core.Taxes.SubTables;
using RealGimm.Core.Taxes.Tables;

namespace RealGimm.Core.Taxes;

public class TaxesCoreModule : Autofac.Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder
      .RegisterType<TaxCalculatorService>()
      .InstancePerLifetimeScope();

    foreach (var taxCalcType in Assembly
      .GetExecutingAssembly()
      .GetTypes()
      .Where(t => typeof(ITaxCalculator).IsAssignableFrom(t)
        && !t.IsAbstract
        && !t.IsInterface))
    {
      builder
        .RegisterType(taxCalcType)
        .As<ITaxCalculator>()
        .AsSelf()
        .InstancePerLifetimeScope();
    }

    builder.RegisterType<TaxConfigGenericRowExportService>()
      .As<IExportService<TaxConfigGenericRow>>()
      .InstancePerLifetimeScope();

    builder.RegisterType<TaxConfigGroupedRowExportService>()
      .As<IExportService<TaxConfigGroupedRow>>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<TaxConfigGenericCoefficientExportService>()
      .As<IExportService<TaxConfigGenericCoefficientSubTableRow>>()
      .InstancePerLifetimeScope();
    
    builder
      .RegisterType<TaxConfigGroupedRateExportService>()
      .As<IExportService<TaxConfigGroupedRateSubTableRow>>()
      .InstancePerLifetimeScope();
  }
}
