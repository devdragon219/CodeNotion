using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.ReadingAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Infrastructure.Interceptors;

namespace RealGimm.Infrastructure.Nrgy.Data;

public class NrgyFilterInterceptor : AccessFilterInterceptor
{
  private static readonly Type[] _handledTypes = new[]
  {
    typeof(UtilityService),
    typeof(Reading),
    typeof(CostCharge),
  };

  public NrgyFilterInterceptor(IServiceProvider serviceProvider) : base(serviceProvider)
  {
  }

  protected override Type[] SupportedTypes => _handledTypes;
}
