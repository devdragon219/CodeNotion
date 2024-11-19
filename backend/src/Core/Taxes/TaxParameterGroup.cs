namespace RealGimm.Core.Taxes;

public record TaxParameterGroup(
  int Year,
  string GroupingName,
  Guid GroupingReference);