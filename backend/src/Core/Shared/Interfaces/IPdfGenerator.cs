using RealGimm.SharedKernel;

namespace RealGimm.Core.Shared.Interfaces;

public interface IPdfGenerator<TEntity>
{
  public Task<FileCacheEntry> GeneratePdfAsync(TEntity entity);
}
