using System.Globalization;
using System.Reflection;
using System.Text.Json;
using Elders.Iso3166;
using Microsoft.Extensions.Localization;

namespace RealGimm.Core.Resources;

public class JsonStringLocalizer : IStringLocalizer
{
  public JsonStringLocalizer()
  {
    _prefix = string.Empty;
  }

  public int? OverrideLCID { get; set; }

  private string TwoLetterISOLanguageName
  {
    get
    {
      return (OverrideLCID is not null
        ? new CultureInfo(OverrideLCID.Value)
        : Thread.CurrentThread.CurrentCulture).TwoLetterISOLanguageName;
    }
  }

  internal JsonStringLocalizer(string prefix)
  {
    if (!string.IsNullOrEmpty(prefix) && !prefix.EndsWith("."))
    {
      prefix += ".";
    }

    _prefix = prefix;
  }

  private static readonly Dictionary<string, Dictionary<string, string>> _cache = new();

  private string FilePath => $"Resources/{TwoLetterISOLanguageName}.json";

  private static readonly string _defaultFilePath = "Resources/it.json";

  private readonly string _prefix;

  public LocalizedString this[string name] => GetString(name);

  public LocalizedString this[string name, params object[] arguments]
  {
    get
    {
      var actualValue = this[name];

      return actualValue.ResourceNotFound
        ? actualValue
        : new LocalizedString(name, string.Format(actualValue.Value, arguments), resourceNotFound: false);
    }
  }

  public IEnumerable<LocalizedString> GetAllStrings(bool includeParentCultures)
  {
    if (!_cache.ContainsKey(TwoLetterISOLanguageName))
    {
      var dictionary = FlattenTranslations(FilePath);
      if (dictionary == null)
      {
        yield break;
      }

      _cache[TwoLetterISOLanguageName] = dictionary;
    }

    foreach (var kvp in _cache[TwoLetterISOLanguageName])
    {
      yield return new LocalizedString(kvp.Key, kvp.Value, false);
    }
  }

  private LocalizedString GetString(string key)
  {
    var prefixedKey = _prefix + key;

    if (!_cache.ContainsKey(TwoLetterISOLanguageName))
    {
      var dictionary = FlattenTranslations(FilePath);
      if (dictionary == null)
      {
        return new LocalizedString(prefixedKey, key, resourceNotFound: true);
      }

      _cache[TwoLetterISOLanguageName] = dictionary;
    }

    if (_cache[TwoLetterISOLanguageName].TryGetValue(prefixedKey, out var tralnslation))
    {
      return new LocalizedString(prefixedKey, tralnslation, resourceNotFound: false);
    }

    return new LocalizedString(prefixedKey, key, resourceNotFound: true);
  }

  private static Dictionary<string, string>? FlattenTranslations(string jsonFilePath)
  {
    if (!File.Exists(jsonFilePath))
    {
      jsonFilePath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!, _defaultFilePath);
    }

    var result = new Dictionary<string, string>();
    var jsonString = File.ReadAllText(jsonFilePath);

    using var document = JsonDocument.Parse(jsonString, new JsonDocumentOptions { CommentHandling = JsonCommentHandling.Skip });
    FlattenCategory(document.RootElement, result, "");

    return result;
  }

  private static void FlattenCategory(JsonElement element, Dictionary<string, string> result, string prefix)
  {
    if (element.ValueKind == JsonValueKind.Object)
    {
      foreach (var property in element.EnumerateObject())
      {
        string currentKey = prefix + property.Name;
        FlattenCategory(property.Value, result, currentKey + ".");
      }
    }
    else if (element.ValueKind == JsonValueKind.String)
    {
      result[prefix.TrimEnd('.')] = element.GetString()!;
    }
  }

  public static string[] SupportedCultures()
  {
    var assemblyDirectory = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

    return Directory.EnumerateFiles($"{assemblyDirectory}/Resources/", "*.json")
      .Select(f => Path.GetFileNameWithoutExtension(f))
      .ToArray();
  }
}
