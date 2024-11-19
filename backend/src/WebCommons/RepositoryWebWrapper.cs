using Ardalis.Specification;
using HotChocolate.Resolvers;
using RealGimm.Core;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons.Extensions;

namespace RealGimm.WebCommons;

public class RepositoryWebWrapper<T> where T : class, IAggregateRoot
{
  private readonly IReadRepository<T> _repository;

  public RepositoryWebWrapper(IReadRepository<T> repository)
  {
    _repository = repository;
  }

  public Task<IQueryable<T>> ListAllAsync(IResolverContext? resolverContext, params ISpecification<T>[] specifications)
  {
    var query = _repository.AsQueryable(specifications);

    if (resolverContext is null)
    {
      return Task.FromResult(query);
    }

    return query.MaterializeIfRequiredAsync(resolverContext);
  }
}
