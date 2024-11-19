using System.Collections.Concurrent;
using System.Reflection;
using PdfSharp.Fonts;

namespace RealGimm.Core.Resources;

public sealed class FontResolver : IFontResolver
{
  private static readonly ConcurrentDictionary<string, byte[]> _fontsCache = new();

  public byte[]? GetFont(string faceName)
  {
    byte[]? font;

    if (_fontsCache.TryGetValue(faceName, out font))
    {
      return font;
    }

    var fontFilePath = Path.Combine(
      Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!,
      "Resources",
      "Fonts",
      faceName);

    if (!File.Exists(fontFilePath))
    {
      return null;
    }

    font = File.ReadAllBytes(fontFilePath);
    _fontsCache.TryAdd(faceName, font);

    return font;
  }

  public FontResolverInfo? ResolveTypeface(string familyName, bool isBold, bool isItalic)
  {
    var suffix = (isBold, isItalic) switch
    {
      (true, true) => "_bi",
      (true, false) => "_b",
      (false, true) => "_i",
      (false, false) => string.Empty,
    };

    return new FontResolverInfo($"{familyName.ToLowerInvariant()}{suffix}.ttf");
  }
}
