using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core;

public static class DateTimeTools
{
  public static DateOnly? ToDateOnly(this DateTime? dateTime)
  {
    if (!dateTime.HasValue)
    {
      return null;
    }

    return DateOnly.FromDateTime(dateTime.Value);
  }

  public static DateOnly ToDateOnly(this DateTime dateTime)
  {
    return DateOnly.FromDateTime(dateTime);
  }

  public static bool CanUpdate<T>(IEnumerable<T> existing, T update)
    where T : IDateTimeRanged, IIdentifiable
  {
    return CanInsert(existing.Where(elem => elem.Id != update.Id), update);
  }

  public static bool CanInsert<T>(IEnumerable<T> existing, T newElement)
    where T : IDateTimeRanged, IIdentifiable
  {
    //Assume the existing list is formally correct

    //There cannot be two unbound time ranges
    if (!newElement.Until.HasValue && existing.Any(e => !e.Until.HasValue))
    {
      return false;
    }

    //If the current element is unbound, check it starts after each previous entry
    if (!newElement.Until.HasValue)
    {
      return existing.All(e => e.Until!.Value <= newElement.Since);
    }
    else
    {
      //Check that no existing range intersects the new one
      return existing.All(e => newElement.Until!.Value <= e.Since
          || (e.Until.HasValue && e.Until.Value <= newElement.Since));
    }
  }
}
