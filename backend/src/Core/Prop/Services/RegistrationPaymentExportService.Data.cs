using RealGimm.Core.Shared.Services;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.Core.Asst.EstateAggregate;

namespace RealGimm.Core.Prop.Services;

public sealed partial class RegistrationPaymentExportService
{
  public record Data(
    RegistrationPayment RegistrationPayment,
    Address Address,
    string EstateInternalCode,
    string ManagementSubjectName);
}