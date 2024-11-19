using RealGimm.Core.IAM.UserAggregate;

namespace RealGimm.Core.IAM.Interfaces;

public interface IUserService
{
  Task<UserDetail> GetUserAsync(int userId, CancellationToken cancellationToken = default);
  Task<List<UserListRow>> GetUserListAsync(CancellationToken cancellationToken = default);
}
