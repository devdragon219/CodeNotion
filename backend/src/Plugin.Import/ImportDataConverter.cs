using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Runtime.InteropServices;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Plugin.Import;

public static class ImportDataConverter
{
  private sealed record PropertyCacheEntry(PropertyInfo Property, MaxLengthAttribute Attribute);
  private static readonly Dictionary<Type, PropertyCacheEntry[]> _propertyCache = new();
  private static readonly object _propertyCacheLock = new();
  private static readonly TimeZoneInfo _cetZone =
    TimeZoneInfo.FindSystemTimeZoneById(
      RuntimeInformation.IsOSPlatform(OSPlatform.Windows)
        ? "Central Europe Standard Time" // Windows time zone ID
        : "Europe/Berlin" // IANA time zone ID for Linux and macOS
      );

  public static string ToDecimalKey(this decimal? value)
  {
    if(value is null) {
      return "-";
    }

    return value.Value.ToString("F2");
  }

  public static string ToDecimalKey(this decimal value)
  {
    return value.ToString("F2");
  }

  /// <summary>
  /// This piece of code is useful for imports from a DATETIME or DATETIME2 Sql Server column, where
  /// the implicit assumption is that the point in time refers to the Central European Time Zone.
  /// This returns a qualified UTC DateTime suitable for storage in PostgreSQL.
  /// </summary>
  /// <param name="source">A CET-based unqualified DateTime</param>
  /// <returns></returns>
  public static DateTime? MakeUTCFromCentralEuropean(DateTime? source)
  {
    if (source is null)
    {
      return null;
    }

    return TimeZoneInfo.ConvertTimeToUtc(source.Value, _cetZone);
  }

  public static bool RoughToponymyMatches(this string? value, string match)
  {
    if (string.IsNullOrEmpty(value) || string.IsNullOrEmpty(match))
    {
      return false;
    }

    //Remove part after the last comma for both values
    var v1 = (value.Contains(',')
      ? value[..value.LastIndexOf(',')]
      : value)
        .ToLowerInvariant()
        .Replace(" ", string.Empty);
    var v2 = (match.Contains(',')
      ? match[..match.LastIndexOf(',')]
      : match)
        .ToLowerInvariant()
        .Replace(" ", string.Empty);

    return v1 == v2;
  }

  public static PaymentType ParseAsRG2PaymentType(this string? value)
    => value switch
    {
      "P1" => PaymentType.Cash,
      "P2" => PaymentType.WireTransfer,
      "P3" => PaymentType.MAV,
      "P4" => PaymentType.RID,
      "P5" => PaymentType.PostAccount,
      "P6" => PaymentType.F23,
      "P7" => PaymentType.CCPM,
      "P8" => PaymentType.DebtNote,
      "P9" => PaymentType.NOPA,
      "P10" => PaymentType.ASCI,
      "P11" => PaymentType.ASTR,
      "P12" => PaymentType.Check,
      "P13" => PaymentType.SalaryDeduction,
      "P14" => PaymentType.AITO,
      _ => PaymentType.Undefined
    };

  public static IncomeType? ParseAsRG2IncomeType(this string? value)
    => value switch
    {
      "1" => IncomeType.ActualIncome,
      "2" => IncomeType.PresumedIncome,
      "3" => IncomeType.BalanceSheetValue,
      "4" => IncomeType.ProposedIncomeByLawIT701_94,
      "5" => null,    //Not declared
      _ => null, //Not defined
    };

  public static SurfaceMeasurementMetric? ParseAsRG2SurfaceMeasurement(this string? value)
    => value switch
    {
      "MQNI" => SurfaceMeasurementMetric.SquareMetreNetNormal,
      "MQLE" => SurfaceMeasurementMetric.SquareMetreGrossNormal,
      "VOLL" => null, //Not supported on RG5
      "VCOM" => null, //Not supported on RG5
      _ => null, //Not defined
    };

  public static void FixStringLengths<T>(T entity) where T : EntityBase
  {
    if (!_propertyCache.ContainsKey(typeof(T)))
    {
      lock (_propertyCacheLock)
      {
        _propertyCache.Add(
          typeof(T),
          typeof(T)
            .GetProperties()
            .Where(p => p.CanRead && p.CanWrite)
            .Select(p =>
            {
              var ml = p.GetCustomAttribute<MaxLengthAttribute>();

              if (ml == null)
                return null;

              return new PropertyCacheEntry(p, ml);
            })
            .Where(pce => pce is not null)
            .Select(pce => pce!)
            .ToArray()
        );
      }
    }

    var properties = _propertyCache[typeof(T)];

    foreach (var pi in properties)
    {
      var val = pi.Property.GetValue(entity) as string;
      var len = pi.Attribute.Length;

      if (!string.IsNullOrEmpty(val) && val.Length > len)
      {
        pi.Property.SetValue(entity, val[..len]);
      }
    }
  }
}
