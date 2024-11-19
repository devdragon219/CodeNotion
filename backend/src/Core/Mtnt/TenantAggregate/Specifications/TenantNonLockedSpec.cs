using Ardalis.Specification;

namespace RealGimm.Core.Mtnt.TenantAggregate.Specifications;

public class TenantNonLockedSpec : Specification<Tenant>
{
  public TenantNonLockedSpec()
  {
    Query
        .Where(t => !t.LockedSince.HasValue);
  }
}
