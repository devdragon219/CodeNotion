using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Mtnt.Data;

public class MtntEfRepository<T> : RgRepositoryBase<T> where T : class, IAggregateRoot
{
  public MtntEfRepository(MtntDbContext dbContext) : base(dbContext)
  {
  }
}
