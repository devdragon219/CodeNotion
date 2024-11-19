using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Fclt.Data;

public class FcltEfRepository<T> : RgRepositoryBase<T> where T : class, IAggregateRoot
{
  public FcltEfRepository(FcltDbContext dbContext) : base(dbContext)
  {
  }
}
