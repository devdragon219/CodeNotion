using RealGimm.Core.Econ.InvoiceAggregate;
using RealGimm.Infrastructure.Interceptors;

namespace RealGimm.Infrastructure.Econ.Data;

public class EconFilterInterceptor : AccessFilterInterceptor
{
  private static readonly Type[] _handledTypes = new[]
    {
      typeof(Invoice),
    };

  public EconFilterInterceptor(
    IServiceProvider serviceProvider) : base(serviceProvider) { }

  protected override Type[] SupportedTypes => _handledTypes;
}