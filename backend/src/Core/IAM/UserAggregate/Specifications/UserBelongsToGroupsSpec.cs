using Ardalis.Specification;

namespace RealGimm.Core.IAM.UserAggregate.Specifications;

public class UserBelongsToAnyGroupsSpec : Specification<User>
{
  public UserBelongsToAnyGroupsSpec(int[] groupIds)
  {
    Query
      .Where(u => u.UserGroups.Any(ug => groupIds.Contains(ug.GroupId)));
  }
}
