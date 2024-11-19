using Ardalis.Result;

namespace RealGimm.Core.IAM.Interfaces;

public interface IUserLoginService
{
  Task<Result> MarkUserLoginAttempt(int userId, bool successful);
}
