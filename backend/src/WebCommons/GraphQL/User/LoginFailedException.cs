using RealGimm.Core.Mtnt;

namespace RealGimm.WebCommons.GraphQL.User;

public class LoginFailedException : UnauthorizedAccessException
{
  public LoginCheckStatus LoginStatus { get; set; }
  public LoginFailedException() : base() { }
  public LoginFailedException(string Message) : base(Message) { }
}