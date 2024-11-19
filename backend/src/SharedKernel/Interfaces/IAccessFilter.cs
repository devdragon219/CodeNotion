using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.SharedKernel.Interfaces;

public interface IAccessFilter<T> : IAccessFilter where T : class, IIdentifiable, IAggregateRoot
{ }

public interface IAccessFilter
{
  Task<int[]> ReachableEntitiesAsync(IUserDataProvider user, CancellationToken cancellationToken);
  CancellationTokenSource InvalidationSource { get; }
}
