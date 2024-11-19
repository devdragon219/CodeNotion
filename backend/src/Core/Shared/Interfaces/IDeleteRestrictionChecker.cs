namespace RealGimm.Core.Shared.Interfaces;

public interface IDeleteRestrictionChecker<TEntity>
{
  public Task<bool> HasRestrictionsAsync(int entityId, CancellationToken cancellationToken = default);
}
