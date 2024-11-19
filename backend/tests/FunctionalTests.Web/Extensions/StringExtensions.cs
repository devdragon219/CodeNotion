using Humanizer;

namespace RealGimm.FunctionalTests.Web.Extensions;

internal static class StringExtensions
{
  public static string CamelizeRespectingAcronyms(this string input)
  {
    var pascalized = input.Pascalize();
    
    if (pascalized.Length == 0)
    {
      return pascalized;
    }

    var firstUpperSymbolsCount = pascalized.TakeWhile(char.IsUpper).Count();

    if (firstUpperSymbolsCount > 2)
    {
      var acronymLength = firstUpperSymbolsCount - 1;

      return pascalized[..acronymLength].ToLower() + pascalized[acronymLength..];
    }

    return pascalized[..1].ToLower() + pascalized[1..];
  }

  public static string AppendLineIfTrue(this string original, bool condition, Lazy<string> value)
  {
    if (condition)
    {
      return original + Environment.NewLine + value.Value;
    }

    return original;
  }

  public static string FixIndentations(this string value, int spacesCount)
  {
    if (value is null)
    {
      throw new ArgumentNullException(nameof(value));
    }

    if (spacesCount <= 0)
    {
      throw new ArgumentOutOfRangeException(nameof(spacesCount));
    }

    return value.Replace(Environment.NewLine, Environment.NewLine + new string(' ', spacesCount));
  }
}
