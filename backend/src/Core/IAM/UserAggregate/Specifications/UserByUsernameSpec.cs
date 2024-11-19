using Ardalis.Specification;

namespace RealGimm.Core.IAM.UserAggregate.Specifications;

public class UserByUsernameSpec : Specification<User>, ISingleResultSpecification<User>
{
  public UserByUsernameSpec(string username)
  {
    Query.Where(u => u.UserName == username);
  }
}
