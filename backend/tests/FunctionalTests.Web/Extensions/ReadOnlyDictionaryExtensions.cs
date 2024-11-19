namespace RealGimm.FunctionalTests.Web.Extensions;

internal static class ReadOnlyDictionaryExtensions
{
  public static TValue GetValue<TValue>(this IReadOnlyDictionary<string, object?> source, string key)
    => (TValue)source[key]!;

  public static IReadOnlyDictionary<string, object?> GetDictionaryValue(this IReadOnlyDictionary<string, object?> source, string key)
    => source.GetValue<IReadOnlyDictionary<string, object?>>(key);

  public static IReadOnlyList<object?> GetListValue(this IReadOnlyDictionary<string, object?> source, string key)
    => source.GetValue<IReadOnlyList<object?>>(key);

  public static IReadOnlyList<TValue> GetListValue<TValue>(this IReadOnlyDictionary<string, object?> source, string key)
    => source
      .GetListValue(key)
      .Cast<TValue>()
      .ToArray();

  public static IReadOnlyList<IReadOnlyDictionary<string, object?>> GetListOfDictionariesValue(
    this IReadOnlyDictionary<string, object?> source,
    string key)
    => source.GetListValue<IReadOnlyDictionary<string, object?>>(key);
}
