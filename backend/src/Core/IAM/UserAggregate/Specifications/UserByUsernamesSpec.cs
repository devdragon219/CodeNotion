using Ardalis.Specification;

namespace RealGimm.Core.IAM.UserAggregate.Specifications;

public class UserByUsernamesSpec : Specification<User>
{
  public UserByUsernamesSpec(string[] usernames)
  {
    Query.Where(u => usernames.Contains(u.UserName));
  }
}
