using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Asst.Models;

public record CatalogueTypeActivityInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public string? Name { get; init; }
  public CatalogueTypeActivityType ActivityType { get; init; }
  public bool IsMandatoryByLaw { get; init; }
}
