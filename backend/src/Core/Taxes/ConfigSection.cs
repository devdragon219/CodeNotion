namespace RealGimm.Core.Taxes;

public record ConfigSection(string Name,
  Guid TaxCalculator,
  ConfigField[][] Form);