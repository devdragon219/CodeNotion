using RealGimm.Core.Common.TaxConfigAggregate;

namespace RealGimm.Core.Taxes;

public record Column(string Code,
  string? SourceField,
  string SourceKey,
  string? FilterKey,
  string? WritebackKey,
  SubValueType ValueType,
  bool IsVisibleInTable,
  bool IsVisibleInDetail,
  bool IsReadonly,
  bool IsMandatory);
