using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Asst.Models;

public record CatalogueItemInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public int EstateId { get; init; }
  public int CatalogueTypeId { get; init; }
  public string InternalCode { get; init; } = default!;
  public EstateStatus Status { get; init; }
  public DateOnly ActivationDate { get; init; }
  public DateOnly LastMaintenanceDate { get; init; }
  public DateOnly? DecommissioningDate { get; init; }
  public CatalogueItemFieldInput[] Fields { get; init; } = Array.Empty<CatalogueItemFieldInput>();
}
