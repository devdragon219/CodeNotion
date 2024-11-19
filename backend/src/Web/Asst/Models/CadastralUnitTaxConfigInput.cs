using RealGimm.Core.CrossModule;

namespace RealGimm.Web.Asst.Models;

public record CadastralUnitTaxConfigInput
{
  public Guid TaxCalculatorId { get; init; }
  public bool IsMandatory { get; init; }
  public string Name { get; init; } = default!;
  public CustomFieldType Type { get; init; }
  public Guid TemplateTypeId { get; init; }
  public string? Value { get; init; }
}
