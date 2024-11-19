using RealGimm.Core.CrossModule;

namespace RealGimm.Core.Taxes;

public record ConfigField(string? Name,
  bool IsMandatory,
  Guid Id,
  CustomFieldType Type,
  Dictionary<string, string>? ValidValues);