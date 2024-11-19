namespace RealGimm.SharedKernel;

public static class NullableComparer
{
  public static bool Equals(string? str1, string? str2)
  {
    // If both are null, they are not different
    if (str1 == null && str2 == null)
      return true;

    // If one is null but not the other, they are different
    if (str1 == null || str2 == null)
      return false;

    // If neither are null, compare their values
    return string.Equals(str1, str2);
  }

  public static bool Equals(DateOnly? do1, DateOnly? do2)
  {
    // If both are null, they are not different
    if (do1 == null && do2 == null)
      return true;

    // If one is null but not the other, they are different
    if (do1 == null || do2 == null)
      return false;

    // If neither are null, compare their values
    return DateOnly.Equals(do1, do2);
  }
}