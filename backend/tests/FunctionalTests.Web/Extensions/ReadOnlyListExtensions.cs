namespace RealGimm.FunctionalTests.Web.Extensions;

internal static class ReadOnlyListExtensions
{
  public static TValue GetValue<TValue>(this IReadOnlyList<object?> source, int index)
    => (TValue)source[index]!;

  public static IReadOnlyDictionary<string, object?> GetDictionaryValue(this IReadOnlyList<object?> source, int index)
    => source.GetValue<IReadOnlyDictionary<string, object?>>(index);
}
