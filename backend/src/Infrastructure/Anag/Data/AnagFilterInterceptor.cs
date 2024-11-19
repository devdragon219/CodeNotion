using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Infrastructure.Interceptors;

namespace RealGimm.Infrastructure.Anag.Data;

public class AnagFilterInterceptor : AccessFilterInterceptor
{
  private static readonly Type[] _handledTypes = new[]
    {
      typeof(Subject),
      typeof(OrgUnit)
    };

  public AnagFilterInterceptor(
    IServiceProvider serviceProvider) : base(serviceProvider) { }

  protected override Type[] SupportedTypes => _handledTypes;
}