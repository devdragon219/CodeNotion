using System.Collections.ObjectModel;

namespace RealGimm.Core;

public class NullSafeCollection<T> : Collection<T>
  where T : notnull
{
  public void AddRange(IEnumerable<T> values)
  {
    ArgumentNullException.ThrowIfNull(values);

    if (values.Any(value => value is null))
    {
      throw new ArgumentNullException(nameof(values), "Some items of the collection are null.");
    }

    foreach (var item in values)
    {
      base.InsertItem(Count, item);
    }
  }

  protected override void InsertItem(int index, T item)
  {
    ArgumentNullException.ThrowIfNull(item);

    base.InsertItem(index, item);
  }

  protected override void SetItem(int index, T item)
  {
    ArgumentNullException.ThrowIfNull(item);

    base.SetItem(index, item);
  }
}
