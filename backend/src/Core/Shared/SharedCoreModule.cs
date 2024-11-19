using System.Reflection;
using Autofac;
using RealGimm.Core.Shared.InterestCalculation;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.Shared.RevaluationCalculation;
using RealGimm.Core.Taxes;

namespace RealGimm.Core.Shared;

public class SharedCoreModule : Autofac.Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder
      .RegisterType<CheckItalianTaxID>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<InterestCalculator>()
      .InstancePerLifetimeScope();

    builder
      .RegisterType<DefaultRevaluationCalculator>()
      .As<IRevaluationCalculator>()
      .InstancePerLifetimeScope();
  }
}
