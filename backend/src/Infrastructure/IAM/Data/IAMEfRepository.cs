using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.IAM.Data;

public class IAMEfRepository<T> : RgRepositoryBase<T> where T : class, IAggregateRoot
{
  public IAMEfRepository(IAMDbContext dbContext) : base(dbContext)
  {
  }
}
