using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Infrastructure.Interceptors;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;

namespace RealGimm.Infrastructure.Prop.Data;

public class PropFilterInterceptor : AccessFilterInterceptor
{
  private static readonly Type[] _handledTypes = new[]
    {
      typeof(Bill),
      typeof(Contract),
      typeof(RegistrationPayment),
      typeof(Administration),
      typeof(RegistryCommunication)
    };

  public PropFilterInterceptor(
    IServiceProvider serviceProvider) : base(serviceProvider) { }

  protected override Type[] SupportedTypes => _handledTypes;
}
