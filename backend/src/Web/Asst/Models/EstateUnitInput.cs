using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.Web.Asst.Models;

public record EstateUnitInput
{
  public int EstateId { get; init; }
  public string? Name { get; init; }
  public string InternalCode { get; init; } = default!;
  public string? ExternalCode { get; init; }
  public int AddressId { get; init; }
  public string? SubNumbering { get; init; }
  public int? StairId { get; init; }
  public int[] FloorIds { get; init; } = Array.Empty<int>();
  public EstateUnitType Type { get; init; }
  public EstateUnitStatus Status { get; init; }
  public int UsageTypeId { get; init; }
  public DateOnly OwnershipStartDate { get; init; }
  public DateOnly? OwnershipEndDate { get; init; }
  public EstateUnitOwnershipType OwnershipType { get; init; }
  public double? OwnershipPercent { get; init; }
  public bool SharedArea { get; init; }
  public string? Notes { get; init; }
  public EstateUnitOfficialActInput? OfficialAct { get; init; } = default!;
  public DateOnly? DisusedDate { get; init; }
  public List<EstateUnitSurfaceSummary>? Surfaces { get; init; } = default!;
  public EstateUnitRepossessionInput? Repossession { get; init; } = default!;
  public CadastralUnitInput? CadastralUnit { get; init; }
}
