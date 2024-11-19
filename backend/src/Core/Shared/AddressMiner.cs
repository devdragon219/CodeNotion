using System.Text.RegularExpressions;

namespace RealGimm.Core.Shared;

public static partial class AddressMiner
{
  public static (string? toponymy, string? numbering) MineData(string? sourceToponymy)
  {
    if (string.IsNullOrWhiteSpace(sourceToponymy))
    {
      return (null, null);
    }

    var toponymy = sourceToponymy
      .Trim()
      .Replace("  ", " ");

    MatchCollection matches = RxNumbering().Matches(toponymy);

    if (matches.Count > 0)
    {
      Match match = matches[0];
      bool isOnlyMatch = matches.Count == 1;
      bool isAtEnd = match.Index + match.Length == toponymy.Length;

      if (isOnlyMatch && isAtEnd)
      {
        //Then we can trim away the number from the toponymy,
        // clean it up, and set it as the toponymy
        sourceToponymy = toponymy[..match.Index].TrimEnd(' ', '.', ',', '-');
        var sourceNumbering = match.Groups[1].Value;
        return (sourceToponymy, sourceNumbering);
      }
    }

    return (toponymy, null);
  }

  [GeneratedRegex("[^\\p{L}]\\s*(\\d[\\dA-Z/a-z\\-]*)")]
  private static partial Regex RxNumbering();
}