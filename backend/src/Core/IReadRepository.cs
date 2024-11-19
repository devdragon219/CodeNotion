using Ardalis.Specification;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core;

public interface IReadRepository<T> : IReadRepositoryBase<T> where T : class, IAggregateRoot
{
  public IQueryable<T> AsQueryable(ISpecification<T> specification);
  
  public IQueryable<T> AsQueryable(params ISpecification<T>[] specifications);

  public Task LoadNavigationsAsync(TicketCondition condition, CancellationToken cancellationToken);
}
