using Autofac;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.WebCommons.Mapping;

public class MapperBase
{
  public static async Task UpdateCollectionAsync<TInput, TObject>(IEnumerable<TInput> input,
    IMapper mapper,
    Func<IEnumerable<TObject>> getExisting,
    Action<TObject> add,
    Action<TObject> remove,
    CancellationToken cancellationToken = default)
      where TInput : class, IMaybeIdentifiable
      where TObject : class, IIdentifiable
  {
    var existing = getExisting().ToList();

    //Objects To Add
    foreach (var toAdd in input.Where(o => !o.Id.HasValue || !existing.Any(eo => eo.Id == o.Id.Value)))
    {
      add((await mapper.MapAsync<TInput, TObject>(toAdd, null, cancellationToken))!);
    }

    //Objects To Update
    foreach(var toUpdate in input.Where(o => o.Id.HasValue && existing.Any(eo => eo.Id == o.Id.Value)))
    {
      var into = existing.First(eo => eo.Id == toUpdate.Id);
      await mapper.MapAsync(toUpdate, into, cancellationToken);
    }

    //Objects To Remove
    foreach(var toRemove in existing.Where(eo => !input.Any(o => o.Id.HasValue && o.Id.Value == eo.Id)))
    {
      remove(toRemove);
    }
  }
}
