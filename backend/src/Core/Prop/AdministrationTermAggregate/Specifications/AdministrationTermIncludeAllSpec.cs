using Ardalis.Specification;

namespace RealGimm.Core.Prop.AdministrationTermAggregate.Specifications;

public sealed class AdministrationTermIncludeAllSpec : Specification<AdministrationTerm>
{
  public AdministrationTermIncludeAllSpec()
  {
    Query
      .Include(administrationTerm => administrationTerm.Administration)
      .Include(administrationTerm => administrationTerm.Installments)
        .ThenInclude(installment => installment.BillItemType)
      .Include(administrationTerm => administrationTerm.Installments)
        .ThenInclude(installment => installment.Payments)
          .ThenInclude(payment => payment.Bill);
  }
}
