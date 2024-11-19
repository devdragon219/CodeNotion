using Ardalis.Specification;

namespace RealGimm.Core.Mtnt.TenantAggregate.Specifications;

public class TenantByNameOrGuid : Specification<Tenant>, ISingleResultSpecification<Tenant>
{
  public TenantByNameOrGuid(Guid guid, string name)
  {
    Query
        .Where(t => t.Name == name || t.GUID == guid);
  }
}
