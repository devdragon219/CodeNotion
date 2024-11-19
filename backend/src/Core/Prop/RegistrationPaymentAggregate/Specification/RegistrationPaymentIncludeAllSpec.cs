using Ardalis.Specification;

namespace RealGimm.Core.Prop.RegistrationPaymentAggregate.Specification;

public sealed class RegistrationPaymentIncludeAllSpec : Specification<RegistrationPayment>
{
  public RegistrationPaymentIncludeAllSpec()
  {
    Query
      .Include(e => e.Contract)
        .ThenInclude(c => c.Type)
      .Include(e => e.Contract)
        .ThenInclude(c => c.LocatedUnits)
      .Include(e => e.Contract)
        .ThenInclude(c => c.Counterparts)
      .Include(e => e.Rows);
  }
}
