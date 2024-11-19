using System.ComponentModel.DataAnnotations;

namespace RealGimm.Core.Common.TaxConfigAggregate;

public class TaxConfigSubValue : EntityBase
{
  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string Code { get; private set; } = default!;

  [MaxLength(StrFieldSizes.NAME)]
  public string Label { get; private set; } = default!;

  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string? SubTable { get; private set; }

  public decimal? NumberValue { get; private set; }

  [MaxLength(StrFieldSizes.DESCRIPTION)]
  public string? StringValue { get; private set; }
  public DateOnly? DateValue { get; private set; }
  public bool? BooleanValue { get; private set; }

  public SubValueType ValueType { get; private set; }

  public void SetReferenceData(
    string code,
    string label,
    string? subTable)
  {
    Code = code;
    Label = label;
    SubTable = subTable;
  }

  public void SetValues(SubValueType type, bool? boolValue, string? stringValue, decimal? numberValue, DateOnly? dateValue)
  {
    BooleanValue = boolValue;
    NumberValue = numberValue;
    StringValue = stringValue;
    DateValue = dateValue;
    ValueType = type;
  }
}
