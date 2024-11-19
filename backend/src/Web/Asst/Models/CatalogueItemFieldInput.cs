using RealGimm.Core.CrossModule;

namespace RealGimm.Web.Asst.Models;

public record CatalogueItemFieldInput
{
  public string? Name { get; init; }
  public bool IsMandatory { get; init; }
  public Guid TemplateTypeId { get; init; }
  public CustomFieldType Type { get; init; }
  public string? Value { get; init; }
}
