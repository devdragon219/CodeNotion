using Autofac;

namespace RealGimm.WebCommons.Mapping;

public class Mapper : IMapper
{
  private readonly IComponentContext _context;

  public Mapper(IComponentContext _context)
  {
    this._context = _context;
  }

  public async Task<TTo?> MapAsync<TFrom, TTo>(TFrom? from, TTo? into = null, CancellationToken cancellationToken = default)
    where TFrom : class
    where TTo : class
  {
    var mapper = _context.Resolve<IMapper<TFrom, TTo>>();

    return await mapper.MapAsync(from, into, cancellationToken);
  }

  public async Task<IEnumerable<TTo?>?> MapAsync<TFrom, TTo>(IEnumerable<TFrom?>? fromEnumerable, CancellationToken cancellationToken = default)
    where TFrom : class
    where TTo : class
  {
    if (fromEnumerable is null)
    {
      return null;
    }

    var list = new List<TTo?>();

    foreach (var from in fromEnumerable)
    {
      list.Add(await MapAsync<TFrom, TTo>(from, null, cancellationToken));
    }

    return list;
  }
}
