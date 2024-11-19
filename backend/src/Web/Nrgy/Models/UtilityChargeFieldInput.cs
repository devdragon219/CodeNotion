using RealGimm.Core.CrossModule;

namespace RealGimm.Web.Nrgy.Models;

public record UtilityChargeFieldInput
{
  public string Name { get; set; } = default!;
  public bool IsMandatory { get; set; }
  public Guid? Id { get; set; }
  public CustomFieldType Type { get; set; }
  public string[]? ValidValues { get; set; }
}
