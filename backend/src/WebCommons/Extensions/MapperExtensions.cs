using RealGimm.SharedKernel.Interfaces;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.WebCommons.Extensions;

public static class MapperExtensions
{
  public static Task<TTo?> MapAsync<TFrom, TTo>(this IMapper mapper, TFrom? from, CancellationToken cancellationToken = default)
    where TFrom : class
    where TTo : class
    => mapper.MapAsync<TFrom, TTo>(from, null, cancellationToken);

  public static Task UpdateCollectionAsync<TFrom, TTo>(
    this IMapper mapper,
    IEnumerable<TFrom> fromEnumerable,
    ICollection<TTo> toCollection,
    CancellationToken cancellationToken = default)
    where TFrom : class, IMaybeIdentifiable
    where TTo : class, IIdentifiable
    => MapperBase.UpdateCollectionAsync(
      fromEnumerable,
      mapper,
      () => toCollection,
      toCollection.Add,
      objectToRemove => toCollection.Remove(objectToRemove),
      cancellationToken);
}
