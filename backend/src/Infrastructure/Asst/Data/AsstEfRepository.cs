using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Asst.Data;

public class AsstEfRepository<T> : RgRepositoryBase<T> where T : class, IAggregateRoot
{
  public AsstEfRepository(AsstDbContext dbContext) : base(dbContext)
  {
  }
}
