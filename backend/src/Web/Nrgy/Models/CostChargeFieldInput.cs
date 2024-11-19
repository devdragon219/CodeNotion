using RealGimm.Core.CrossModule;

namespace RealGimm.Web.Nrgy.Models;

public record CostChargeFieldInput
{
  public string Name { get; set; } = default!;
  public bool IsMandatory { get; set; }
  public Guid TemplateTypeId { get; set; }
  public CustomFieldType Type { get; set; }
  public string? Value { get; set; }
}
