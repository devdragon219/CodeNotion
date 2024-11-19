namespace RealGimm.WebCommons.Mapping;

public interface IMapper
{
  public Task<TTo?> MapAsync<TFrom, TTo>(TFrom? from, TTo? into = null, CancellationToken cancellationToken = default)
    where TFrom : class
    where TTo : class;

  public Task<IEnumerable<TTo?>?> MapAsync<TFrom, TTo>(IEnumerable<TFrom?>? fromEnumerable, CancellationToken cancellationToken = default)
    where TFrom : class
    where TTo : class;
}

public interface IMapper<TFrom, TTo>
  where TFrom : class
  where TTo : class
{
  public Task<TTo?> MapAsync(TFrom? from, TTo? into = null, CancellationToken cancellationToken = default);
}
