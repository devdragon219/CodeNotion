using RealGimm.Core.Prop.AdministrationTermAggregate;

namespace RealGimm.Core.Prop.Interfaces;
public interface IAdministrationTermService
{
  Task<IEnumerable<TermGroupedInstallmentPayment>> GetInstallmentPaymentsGroupedByBill(int administrationTermId, CancellationToken cancellationToken);
}
