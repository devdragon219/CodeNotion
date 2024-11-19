using PortCMIS.Client;

namespace RealGimm.Infrastructure.Docs.Types;

public static class CmisTypesExtension
{
    public static string? TryGetValue(this IQueryResult result, string propertyId)
    {
        var p = result.Properties.FirstOrDefault(pr => pr.Id == propertyId);

        return p?.FirstValue?.ToString();
    }

    public static DateTime? TryGetDateTime(this IQueryResult result, string propertyId)
    {
        var p = result.Properties.FirstOrDefault(pr => pr.Id == propertyId);

        if(p == null) return null;

        return DateTime.TryParse(p.FirstValue?.ToString(), out DateTime dt) ? dt : null;
    }

    public static T? TryGetValue<T>(this IQueryResult result, string propertyId) where T : struct
    {
        var p = result.Properties.FirstOrDefault(pr => pr.Id == propertyId);

        return p == null ? null : Enum.Parse<T>(p.FirstValue?.ToString()!);
    }

    public static string? TryGetValue(this ICmisObjectProperties result, string propertyId)
    {
        var p = result.Properties.FirstOrDefault(pr => pr.Id == propertyId);

        return p?.FirstValue?.ToString();
    }

    public static string[] TryGetMultipleValues(this ICmisObjectProperties result, string propertyId)
    {
        var p = result.Properties.FirstOrDefault(pr => pr.Id == propertyId);

        return p?.Values is not null ? p.Values.Select(o => o.ToString()!).ToArray() : Array.Empty<string>();
    }

    public static DateTime? TryGetDateTime(this ICmisObjectProperties result, string propertyId)
    {
        var p = result.Properties.FirstOrDefault(pr => pr.Id == propertyId);

        if(p == null) return null;

        return p.FirstValue is DateTime dateTime ? dateTime : null;
    }

    public static T? TryGetValue<T>(this ICmisObjectProperties result, string propertyId) where T : struct
    {
        var p = result.Properties.FirstOrDefault(pr => pr.Id == propertyId);

        return p == null ? null : Enum.Parse<T>(p.FirstValue?.ToString()!);
    }
}
