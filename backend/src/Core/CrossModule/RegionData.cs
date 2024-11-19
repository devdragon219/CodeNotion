using System.Globalization;
using Elders.Iso3166;

namespace RealGimm.Core.CrossModule;

public static class RegionData
{
  private static readonly Dictionary<string, string> _cachedValues = new();

  static RegionData()
  {
    foreach (var country in Country.GetAllCountries())
    {
      try
      {
        var region = new RegionInfo(country.TwoLetterCode);

        _cachedValues.Add(country.ThreeLetterCode.ToLowerInvariant(), region.NativeName);
      }
      catch (ArgumentException ae)
      {
        //Ignore this, when the region code was not found
        _ = ae;
      }
    }
  }

  public static string? RegionNameFromISO(string? iso3)
  {
    if (string.IsNullOrEmpty(iso3)) return null;

    iso3 = iso3.ToLowerInvariant();

    return _cachedValues.ContainsKey(iso3)
      ? _cachedValues[iso3]
      : null;
  }
}
