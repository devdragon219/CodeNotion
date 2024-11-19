using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.Web.Asst.Models;

public record CadastralUnitInput
{
  public int? EstateUnitId { get; init; }
  public string? InternalCode { get; init; }
  public AddressInput Address { get; init; } = new();
  public EstateUnitType? Type { get; init; }
  public CadastralUnitStatus? Status { get; init; }
  public DateOnly? Since { get; init; }
  public DateOnly? Until { get; init; }
  public CadastralUnitInspectionInput? Inspection { get; init; }
  public CadastralUnitIncomeInput Income { get; init; } = new();
  public CadastralCoordinatesInput[]? Coordinates { get; init; }
  public CadastralExpensesInput[]? Expenses { get; init; }
  public CadastralUnavailabilityInput[]? Unavailabilities { get; init; }
  public CadastralUnitTaxConfigInput[]? TaxConfig { get; init; }
  public string? CadastralNotes { get; init; }
  public string? FiscalNotes { get; init; }
  public string? ConsortiumNotes { get; init; }
  public bool IsAncillaryUnit { get; init; }
  public bool IsCadastralRegistrationInProgress { get; init; }
}
