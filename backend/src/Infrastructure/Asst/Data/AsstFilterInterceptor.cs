using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Infrastructure.Interceptors;

namespace RealGimm.Infrastructure.Asst.Data;

public class AsstFilterInterceptor : AccessFilterInterceptor
{
  private static readonly Type[] _handledTypes = new[]
    {
      typeof(CatalogueItem),
      typeof(CadastralUnit),
      typeof(Estate),
      typeof(EstateUnit),
      typeof(EstateSubUnit)
    };

  public AsstFilterInterceptor(
    IServiceProvider serviceProvider) : base(serviceProvider) { }

  protected override Type[] SupportedTypes => _handledTypes;
}
