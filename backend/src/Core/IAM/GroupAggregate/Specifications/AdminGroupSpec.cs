using Ardalis.Specification;

namespace RealGimm.Core.IAM.GroupAggregate.Specifications;

public class UserAdminGroupSpec : Specification<Group>
{
  public UserAdminGroupSpec()
  {
    Query.Where(g => g.Features.Any(f => f.Feature == Features.ADMIN_USERS_AND_GROUPS));
  }
}
