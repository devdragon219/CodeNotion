using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Nrgy.Data;

public class NrgyEfRepository<T> : RgRepositoryBase<T> where T : class, IAggregateRoot
{
  public NrgyEfRepository(NrgyDbContext dbContext) : base(dbContext)
  {
  }
}
