namespace RealGimm.SharedKernel;

public static class NullableStringConverter
{
  public static int? ToNullableInt32(this string? value)
  {
    if (string.IsNullOrEmpty(value)) return null;

    try
    {
      return Convert.ToInt32(value);
    }
    catch
    {
      return null;
    }
  }

  public static DateOnly? ToNullableDateOnly(this string? value)
  {
    if (string.IsNullOrEmpty(value)) return null;

    try
    {
      return DateOnly.FromDateTime(Convert.ToDateTime(value));
    }
    catch
    {
      return null;
    }
  }

  public static DateTime? ToNullableDateTime(this string? value)
  {
    if (string.IsNullOrEmpty(value)) return null;

    try
    {
      return Convert.ToDateTime(value);
    }
    catch
    {
      return null;
    }
  }
}