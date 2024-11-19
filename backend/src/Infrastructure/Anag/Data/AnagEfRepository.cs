using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Anag.Data;

public class AnagEfRepository<T> : RgRepositoryBase<T> where T : class, IAggregateRoot
{
  public AnagEfRepository(AnagDbContext dbContext) : base(dbContext)
  {
  }
}
