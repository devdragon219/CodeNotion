using System.Globalization;

namespace RealGimm.SharedKernel;

public static class CountryCulture
{
  public static void SetCountry(string? Country)
  {
    if (!string.IsNullOrEmpty(Country))
    {
      //Try set current country to initialize data accordingly
      var foundCI = CultureInfo.GetCultures(CultureTypes.AllCultures)
        .FirstOrDefault(c => string.Equals(
          c.ThreeLetterISOLanguageName,
          Country,
          StringComparison.InvariantCultureIgnoreCase));

      if (foundCI != null)
      {
        Thread.CurrentThread.CurrentCulture = foundCI;
        Thread.CurrentThread.CurrentUICulture = foundCI;
      }
    }
  }
}