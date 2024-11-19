using RealGimm.Core.CrossModule;

namespace RealGimm.Web.Asst.Models;

public sealed record CatalogueTypeFieldInput
{
  public Guid? Id { get; init; }
  public string? Name { get; init; }
  public bool IsMandatory { get; init; }
  public CustomFieldType Type { get; init; }
  public string[]? ValidValues { get; init; }
}
