using Ardalis.Specification;

namespace RealGimm.Core.IAM.UserAggregate.Specifications;

public class UserIncludeAllForListSpec : Specification<User>
{
  public UserIncludeAllForListSpec()
  {
    Query
      .Include(user => user.UserGroups)
        .ThenInclude(uesrGroup => uesrGroup.Group);
  }
}
