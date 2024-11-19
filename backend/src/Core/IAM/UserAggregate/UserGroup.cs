using RealGimm.SharedKernel;
using RealGimm.Core.IAM.GroupAggregate;

namespace RealGimm.Core.IAM.UserAggregate;

public class UserGroup : EntityBase
{
  public Group Group { get; private set; } = null!;
  public int GroupId { get; private set; }
  public User User { get; private set; } = null!;
  public int UserId { get; private set; }
  public DateTime CreationDate { get; private set; } = DateTime.UtcNow;

  public void SetGroup(Group g)
  {
    Group = g;
  }

  public void SetUser(User u)
  {
    User = u;
  }
}
