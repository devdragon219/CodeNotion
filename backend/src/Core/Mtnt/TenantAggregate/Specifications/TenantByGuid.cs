using Ardalis.Specification;

namespace RealGimm.Core.Mtnt.TenantAggregate.Specifications;

public class TenantByGuid : Specification<Tenant>, ISingleResultSpecification<Tenant>
{
  public TenantByGuid(Guid guid)
  {
    Query
        .Where(t => t.GUID == guid);
  }
}
