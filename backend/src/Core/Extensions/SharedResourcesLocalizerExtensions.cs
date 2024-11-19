using ClosedXML.Excel;
using Microsoft.Extensions.Localization;
using RealGimm.Core.Resources;

namespace RealGimm.Core.Extensions;

public static class SharedResourcesLocalizerExtensions
{
  public static LocalizedString LocalizeContentCategoryGroup(this IStringLocalizer<SharedResources> localizer, string groupName)
    => localizer[$"ContentCategoryGroup.{groupName}"];

  public static LocalizedString LocalizeEnumValue<TEnum>(this IStringLocalizer<SharedResources> localizer, TEnum value)
    where TEnum : struct, Enum
    => localizer[$"{typeof(TEnum).Name}.{Enum.GetName(value)}"];

  public static LocalizedString? LocalizeEnumValue<TEnum>(this IStringLocalizer<SharedResources> localizer, TEnum? value)
    where TEnum : struct, Enum
    => value.HasValue
      ? localizer.LocalizeEnumValue(value.Value)
      : null;

  public static LocalizedString LocalizeCountry(this IStringLocalizer<SharedResources> localizer, string countryIso3)
    => localizer[$"Countries.{countryIso3.ToUpperInvariant()}"];
}
