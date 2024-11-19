using Ardalis.Specification;

namespace RealGimm.Core.IAM.GroupAggregate.Specifications;

public class GroupIncludeAllSpec : Specification<Group>
{
  public GroupIncludeAllSpec()
  {
    Query.Include(group => group.Features);
  }
}
