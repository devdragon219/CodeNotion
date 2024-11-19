using RealGimm.Core.EventSystem;

namespace RealGimm.Core.IAM.UserAggregate.Events;

public record UserLoginEvent : DomainEventBase
{
  public int UserId { get; private set; }
  public string UserName { get; private set; }

  public UserLoginEvent(int userId, string username)
  {
    UserId = userId;
    UserName = username;
  }
}
