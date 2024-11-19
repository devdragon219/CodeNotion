using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Infrastructure.Common.Data;

public class CommonEfRepository<T> : RgRepositoryBase<T> where T : class, IAggregateRoot
{
  public CommonEfRepository(CommonDbContext dbContext) : base(dbContext)
  {
  }
}
