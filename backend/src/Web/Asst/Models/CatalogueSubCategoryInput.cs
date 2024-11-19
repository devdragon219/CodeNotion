using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Asst.Models;

public record CatalogueSubCategoryInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public string? Name { get; init; }
  public string InternalCode { get; init; } = default!;
}
