using Humanizer;

namespace RealGimm.Core.Docs.DocumentAggregate.Extensions;

public static class ContentCategoryExtensions
{
  public static string GetGroupName(this ContentCategory category)
    => string.Join('_', Enum.GetName(category)!
        .Underscore()
        .ToUpper()
        .Split('_', StringSplitOptions.RemoveEmptyEntries)
        .Take(2));
}
