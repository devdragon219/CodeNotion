using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Prop.Data;

public class PropEfRepository<T> : RgRepositoryBase<T> where T : class, IAggregateRoot
{
  public PropEfRepository(PropDbContext dbContext) : base(dbContext)
  {
  }
}
