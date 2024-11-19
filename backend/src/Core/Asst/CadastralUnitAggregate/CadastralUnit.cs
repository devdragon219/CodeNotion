using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate;

namespace RealGimm.Core.Asst.CadastralUnitAggregate;

public class CadastralUnit : EntityBase, IAggregateRoot, IInternallyCoded, IDateOnlyRanged, ISoftDeletable
{
  [Required, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string InternalCode { get; private set; } = default!;

  [Required]
  public CadastralUnitStatus? Status { get; private set; }

  [Required]
  public EstateUnitType? Type { get; private set; }

  [Required]
  public EstateUnit? EstateUnit { get; private set; }

  [Required]
  public Address? Address { get; private set; }
  public int? AddressId { get; private set; }

  public DateOnly? Since { get; private set; }
  public DateOnly? Until { get; private set; }
  public DateTime? DeletionDate { get; private set; }
  public DateTime? LastRelevantChangeDate { get; private set; }
  public Guid[] HistoryTags { get; private set; } = [];

  public bool IsCadastralRegistrationInProgress { get; private set; }
  public bool IsAncillaryUnit { get; private set; }

  public NullSafeCollection<CadastralUnavailability> Unavailabilities { get; private set; } = new();
  public NullSafeCollection<CadastralCoordinates> Coordinates { get; private set; } = new();
  public NullSafeCollection<CadastralExpenses> Expenses { get; private set; } = new();
  public NullSafeCollection<CadastralUnitTaxConfig> TaxConfig { get; private set; } = new();
  public NullSafeCollection<AssetTaxCalculation> TaxPayments { get; private set; } = new();

  public CadastralUnitIncome Income { get; private set; } = default!;

  [MaxLength(StrFieldSizes.NOTES)]
  public string? CadastralNotes { get; private set; }

  [MaxLength(StrFieldSizes.NOTES)]
  public string? FiscalNotes { get; private set; }

  [MaxLength(StrFieldSizes.NOTES)]
  public string? ConsortiumNotes { get; private set; }

  public CadastralUnitInspection? Inspection { get; private set; }


  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetType(EstateUnitType? type) => Type = type;

  public void SetStatus(CadastralUnitStatus? status) => Status = status;

  public void SetEstateUnit(EstateUnit estateUnit)
  {
    ArgumentNullException.ThrowIfNull(estateUnit);

    EstateUnit = estateUnit;
  }

  public void SetDates(DateOnly? since, DateOnly? until)
  {
    Since = since;

    Until = until;
  }

  public void SetCadastralFlags(bool isCadastralRegistrationInProgress, bool isAncillaryUnit)
  {
    IsCadastralRegistrationInProgress = isCadastralRegistrationInProgress;
    IsAncillaryUnit = isAncillaryUnit;
  }

  public void SetLastRelevantChangeDate(DateTime? lastRelevantChangeDate)
  {
    LastRelevantChangeDate = lastRelevantChangeDate;
  }

  public void SetIncome(CadastralUnitIncome income)
  {
    ArgumentNullException.ThrowIfNull(income);

    Income ??= income;
  }

  public void SetAddress(Address address)
  {
    ArgumentNullException.ThrowIfNull(address);

    if (Address is null || Address.Id != address.Id)
    {
      Address = address;
    }
  }

  public void SetInspection(CadastralUnitInspection? inspection) => Inspection = inspection;

  public void SetNotes(string? cadastral, string? fiscal, string? consortium)
  {
    CadastralNotes = cadastral;
    FiscalNotes = fiscal;
    ConsortiumNotes = consortium;
  }

  public void SetHistoryTags(Guid[] array)
    => HistoryTags = array ?? throw new ArgumentNullException(nameof(array));

  public void AddHistoryTags(IEnumerable<Guid> historyTags)
  {
    ArgumentNullException.ThrowIfNull(historyTags);

    HistoryTags = HistoryTags.Concat(historyTags).Distinct().ToArray();
  }

  public void MarkAsDeleted() => DeletionDate = DateTime.UtcNow;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.CadastralUnitInternalCodeIsNullOrEmptyString.ToValidationError();
    }

    if (Status is null)
    {
      yield return ErrorCode.StatusIsNull.ToValidationError();
    }

    if (Type is null)
    {
      yield return ErrorCode.TypeIsNull.ToValidationError();
    }

    if (Since.HasValue && Since.Value.Year is < DataLimits.MIN_YEAR or > DataLimits.MAX_YEAR)
    {
      yield return ErrorCode.CadastralUnitInvalidSince.ToValidationError();
    }

    if (!Since.HasValue && Until.HasValue)
    {
      yield return ErrorCode.CadastralUnitInvalidUntil.ToValidationError();
    }

    if (Since.HasValue && Until.HasValue && (Until.Value < Since!.Value || Until.Value.Year > DataLimits.MAX_YEAR))
    {
      yield return ErrorCode.CadastralUnitInvalidUntil.ToValidationError();
    }

    if (Until.HasValue && Status != CadastralUnitStatus.Cancelled)
    {
      yield return ErrorCode.CadastralUnitInvalidUntil.ToValidationError();
    }

    foreach (var validationError in Income.Validate())
    {
      yield return validationError;
    }

    if (Inspection is not null)
    {
      foreach (var validationError in Inspection.Validate())
      {
        yield return validationError;
      }
    }

    foreach (var coordinates in Coordinates)
    {
      foreach (var validationError in coordinates.Validate())
      {
        yield return validationError;
      }
    }

    foreach (var expence in Expenses)
    {
      foreach (var validationError in expence.Validate())
      {
        yield return validationError;
      }
    }

    if (Unavailabilities.ContainsOverlaps())
    {
      yield return ErrorCode.CadastralUnitUnavailabilitiesContainsOverlaps.ToValidationError();
    }
  }
}
