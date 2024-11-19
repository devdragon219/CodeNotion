using Microsoft.EntityFrameworkCore.Metadata.Internal;
using RealGimm.Core.Common.TaxConfigAggregate;
using RealGimm.Web.Common.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Common.Mapping;

public sealed class TaxConfigSubValueArrayMapper : IMapper<TaxConfigSubValueRowInput, TaxConfigSubValue>
{
  public TaxConfigSubValue? Map(TaxConfigSubValueRowInput? from, TaxConfigSubValue? into)
  {
    if (from is null || from.ColumnValues.Length == 0)
    {
      return null;
    }

    var tcSubv = into ?? new TaxConfigSubValue();

    string code;
    string? label, stringValue;
    bool? boolValue;
    decimal? numberValue;
    DateOnly? dateValue;

    code = from.ColumnValues
      .FirstOrDefault(cv => cv.Code == from.ColumnMappings["code"])!.StringValue!;
    label = from.ColumnMappings.TryGetValue("label", out var labelMap)
      ? from.ColumnValues.FirstOrDefault(cv => cv.Code == labelMap)?.StringValue
      : code;
    stringValue = from.ColumnMappings.TryGetValue("stringValue", out var stringMap)
      ? from.ColumnValues.FirstOrDefault(cv => cv.Code == stringMap)?.StringValue
      : null;
    boolValue = from.ColumnMappings.TryGetValue("booleanValue", out var boolMap)
      ? from.ColumnValues.FirstOrDefault(cv => cv.Code == boolMap)?.BooleanValue
      : null;
    numberValue = from.ColumnMappings.TryGetValue("numberValue", out var numberMap)
      ? from.ColumnValues.FirstOrDefault(cv => cv.Code == numberMap)?.NumberValue
      : null;
    dateValue = from.ColumnMappings.TryGetValue("dateValue", out var dateMap)
      ? from.ColumnValues.FirstOrDefault(cv => cv.Code == numberMap)?.DateValue
      : null;

    tcSubv.SetReferenceData(code, label ?? code, from.SubTable);
    tcSubv.SetValues(
      stringValue is not null
        ? SubValueType.String
        : (
          boolValue is not null
          ? SubValueType.Boolean
          : (
            numberValue is not null
            ? SubValueType.Number
            : SubValueType.Date
          )
        ),
      boolValue,
      stringValue,
      numberValue,
      dateValue);

    return tcSubv;
  }

  Task<TaxConfigSubValue?> IMapper<TaxConfigSubValueRowInput, TaxConfigSubValue>.MapAsync(
    TaxConfigSubValueRowInput? from,
    TaxConfigSubValue? into,
    CancellationToken cancellationToken)
    => Task.FromResult(Map(from, into));
}
