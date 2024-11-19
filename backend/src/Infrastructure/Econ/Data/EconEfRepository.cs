using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Econ.Data;

public class EconEfRepository<T> : RgRepositoryBase<T> where T : class, IAggregateRoot
{
  public EconEfRepository(EconDbContext dbContext) : base(dbContext)
  {
  }
}
