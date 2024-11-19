using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using System.Collections.ObjectModel;

namespace RealGimm.Core.Asst.EstateUnitAggregate;

public class EstateUnit : EntityBase, IAggregateRoot, IInternallyCoded, ISoftDeletable
{
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? Name { get; private set; }

  [Required, FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string InternalCode { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ExternalCode { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public EstateUnitType Type { get; private set; }
  public EstateUnitStatus Status { get; private set; }
  public EstateUsageType UsageType { get; private set; } = default!;
  public EstateUnitOwnershipType OwnershipType { get; private set; }
  public DateOnly OwnershipStartDate { get; private set; }
  public DateOnly? OwnershipEndDate { get; private set; }
  public double? OwnershipPercent { get; private set; }
  public bool SharedArea { get; private set; }
  public int? ProcurementActId { get; private set; }
  public int ManagementSubjectId { get; private set; }
  public int? CostCentreId { get; private set; }
  public DateOnly? DisusedDate { get; private set; }
  public DateTime? DeletionDate { get; private set; }
  public DateTime? LastRelevantChangeDate { get; private set; }
  public Estate Estate { get; private set; } = default!;

  public Address Address { get; private set; } = default!;

  [MaxLength(StrFieldSizes.NUMBERING_OR_POSTCODE)]
  public string? SubNumbering { get; private set; }

  public Stair? Stair { get; private set; }
  public int? OfficialActId { get; private set; }

  public Guid[] HistoryTags { get; private set; } = Array.Empty<Guid>();

  private readonly List<EstateSubUnit> _estateSubUnits = new();
  private readonly List<Repossession> _repossessions = new();
  private readonly List<UnitExpenses> _unitExpenses = new();
  private readonly List<EstateUnitSurface> _surfaces = new();
  private readonly List<Floor> _floors = new();
  private readonly List<EstateUnitFloor> _estateUnitFloors = new();
  private readonly List<CadastralUnit> _cadastralUnits = new();

  public IReadOnlyList<EstateSubUnit> EstateSubUnits => _estateSubUnits.AsReadOnly();
  public IReadOnlyList<Repossession> Repossessions => _repossessions.AsReadOnly();
  public IReadOnlyList<UnitExpenses> UnitExpenses => _unitExpenses.AsReadOnly();
  public IReadOnlyList<EstateUnitSurface> Surfaces => _surfaces.AsReadOnly();

  public IReadOnlyList<Floor> Floors => _floors.AsReadOnly();

  [GraphQLIgnore]
  public IReadOnlyList<EstateUnitFloor> EstateUnitFloors => _estateUnitFloors.AsReadOnly();

  [NotMapped]
  public Repossession? LastRepossession => _repossessions.OrderByDescending(r => r.EventDate ?? DateOnly.MinValue).FirstOrDefault();

  public IReadOnlyList<CadastralUnit> CadastralUnits => _cadastralUnits.AsReadOnly();

  [NotMapped]
  public CadastralUnit? CurrentCadastralUnit => CadastralUnits
    .OrderByDescending(x => x.Since)
    .Take(1)
    .FirstOrDefault(c => !c.DeletionDate.HasValue);

  [NotMapped]
  public int? NetSurface => _surfaces.Where(s => s.Metric == SurfaceMeasurementMetric.SquareMetreNetNormal).Sum(s => s.SurfaceSqMTotal);

  [NotMapped]
  public int? GrossSurface => _surfaces.Where(s => s.Metric == SurfaceMeasurementMetric.SquareMetreGrossNormal).Sum(s => s.SurfaceSqMTotal);

  public void SetName(string? name) => Name = name;

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetType(EstateUnitType type) => Type = type;

  public void SetStatus(EstateUnitStatus status) => Status = status;

  public void SetUsageType(EstateUsageType usageType)
    => UsageType = usageType ?? throw new ArgumentNullException(nameof(usageType));

  public void SetOwnership(
    EstateUnitOwnershipType ownershipType,
    DateOnly ownershipStartDate,
    double? ownershipPercent,
    DateOnly? ownershipEndDate)
  {
    OwnershipStartDate = ownershipStartDate;
    OwnershipType = ownershipType;
    OwnershipPercent = ownershipPercent;
    OwnershipEndDate = ownershipEndDate;
  }

  public void SetExternalCode(string? externalCode) => ExternalCode = externalCode;

  public void SetNotes(string? notes) => Notes = notes;

  public void SetSharedArea(bool sharedArea) => SharedArea = sharedArea;

  public void SetStair(Stair? stair) => Stair = stair;

  public void SetDisusedDate(DateOnly? disusedDate) => DisusedDate = disusedDate;

  public void SetLastRelevantChangeDate(DateTime? lastRelevantChangeDate)
  {
    LastRelevantChangeDate = lastRelevantChangeDate;
  }

  public void SetEstate(Estate estate)
  {
    ArgumentNullException.ThrowIfNull(estate);

    Estate = estate;
    ManagementSubjectId = estate.ManagementSubjectId;
  }

  public void SetManagementSubject(int managementSubjectId) => ManagementSubjectId = managementSubjectId;

  public void SetCadastralUnit(CadastralUnit unit)
  {
    ArgumentNullException.ThrowIfNull(unit);
    ArgumentNullException.ThrowIfNull(unit.Since);

    var lastUnit = CadastralUnits.OrderByDescending(c => c.Since).FirstOrDefault();

    if (CurrentCadastralUnit is not null && unit.Since < CurrentCadastralUnit.Since)
    {
      throw new ArgumentException(nameof(unit));
    }

    if (lastUnit is not null && unit.Since <= lastUnit.Since)
    {
      var lastSince = unit.Since!.Value.AddDays(-1);

      //This means that the last unit is deleted. We need to "move" any dates to earlier than the new unit.
      foreach (var cadastralUnit in CadastralUnits.OrderByDescending(c => c.Since))
      {
        if (cadastralUnit.Since > lastSince)
        {
          cadastralUnit.SetDates(lastSince, cadastralUnit.Until);
          lastSince = lastSince.AddDays(-1);
        }
      }
    }

    _cadastralUnits.Add(unit);
  }

  public void SetOfficialActId(int? officialActId) => OfficialActId = officialActId;

  public void MarkAsDeleted() => DeletionDate = DateTime.UtcNow;

  public void SetAddress(Address address, string? subNumbering)
  {
    ArgumentNullException.ThrowIfNull(address);

    Address = address;

    SubNumbering = subNumbering;
  }

  public void AddSubUnit(EstateSubUnit unit)
  {
    ArgumentNullException.ThrowIfNull(unit);
    _estateSubUnits.Add(unit);
  }

  public void RemoveSubUnit(EstateSubUnit unit)
  {
    ArgumentNullException.ThrowIfNull(unit);
    _estateSubUnits.Remove(unit);
  }

  public void AddRepossession(Repossession repossession)
  {
    ArgumentNullException.ThrowIfNull(repossession);

    _repossessions.Add(repossession);
  }

  public void AddExpenses(UnitExpenses expenses)
  {
    ArgumentNullException.ThrowIfNull(expenses);

    _unitExpenses.Add(expenses);
  }

  public void AddHistoryTags(IEnumerable<Guid> historyTags)
  {
    ArgumentNullException.ThrowIfNull(historyTags);
    HistoryTags = HistoryTags.Concat(historyTags).Distinct().ToArray();
  }

  public void SetFloors(Floor[] floors)
  {
    var locals = _floors.ToList();

    foreach (var toAdd in floors.Where(f => !locals.Any(lf => lf.Id == f.Id)))
    {
      _floors.Add(toAdd);

      var estateUnitFloor = new EstateUnitFloor();
      estateUnitFloor.SetEstateUnit(this);
      estateUnitFloor.SetFloor(toAdd);
      _estateUnitFloors.Add(estateUnitFloor);
    }

    foreach (var toRemove in locals.Where(lf => !floors.Any(f => f.Id == lf.Id)))
    {
      _estateUnitFloors.RemoveAll(euf => euf.FloorId == toRemove.Id);
      _floors.Remove(toRemove);
    }
  }

  public void AddFloor(Floor floor)
  {
    ArgumentNullException.ThrowIfNull(floor);

    var estateUnitFloor = new EstateUnitFloor();
    estateUnitFloor.SetEstateUnit(this);
    estateUnitFloor.SetFloor(floor);
    _estateUnitFloors.Add(estateUnitFloor);

    _floors.Add(floor);
  }

  public void RemoveFloor(Floor floor)
  {
    ArgumentNullException.ThrowIfNull(floor);

    _estateUnitFloors.RemoveAll(euf => euf.FloorId == floor.Id);
    _floors.Remove(floor);
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.EsateUnitInternalCodeIsNullOrEmptyString.ToValidationError();
    }

    if (OwnershipStartDate.Year is < DataLimits.MIN_YEAR or > DataLimits.MAX_YEAR)
    {
      yield return ErrorCode.InvalidOwnershipStartDate.ToValidationError();
    }

    if (Address is null)
    {
      yield return ErrorCode.AddressIsNotProvided.ToValidationError();
    }

    if (Address is not null)
    {
      foreach (var validationError in Address.Validate())
      {
        yield return validationError;
      }
    }

    if (!UsageType.IsForEstateUnit)
    {
      yield return ErrorCode.UsageTypeNotForThisEntity.ToValidationError();
    }

    if (!AllowedOwnershipTypes.TryGetValue(Estate.Ownership, out var allowedOwnershipTypes)
      || !allowedOwnershipTypes.Contains(OwnershipType))
    {
      yield return ErrorCode.OwnershipTypeNotMatching.ToValidationError();
    }

    if (Floors.Count == 0)
    {
      yield return ErrorCode.FloorsAreNotProvided.ToValidationError();
    }

    if (DisusedDate.HasValue && DisusedDate.Value > DateOnly.FromDateTime(DateTime.Today.AddDays(1)))
    {
      yield return ErrorCode.DisusedDateIsInTheFuture.ToValidationError();
    }

    if (CurrentCadastralUnit is not null)
    {
      foreach (var validationError in CurrentCadastralUnit.Validate())
      {
        yield return validationError;
      }
    }
  }

  public void SetSurfaces(IEnumerable<EstateUnitSurface> surfaces)
  {
    var existing = _surfaces.ToList();

    foreach (var toAdd in surfaces
      .Where(newSur => !existing.Any(oldSur => oldSur.Matches(newSur))))
    {
      _surfaces.Add(toAdd);
    }

    foreach (var toUpdate in surfaces
      .Where(newSur => existing.Any(oldSur => oldSur.Matches(newSur)
        && (oldSur.SurfaceSqMTotal != newSur.SurfaceSqMTotal
          || oldSur.SurfaceSqMCommonArea != newSur.SurfaceSqMCommonArea
          || oldSur.SurfaceSqMSideArea != newSur.SurfaceSqMSideArea))))
    {
      var existingSur = existing.First(oldSur => oldSur.Matches(toUpdate));
      existingSur.SetMeasurements(toUpdate.SurfaceSqMTotal,
        toUpdate.SurfaceSqMCommonArea,
        toUpdate.SurfaceSqMSideArea);
    }

    foreach (var toRemove in existing.Where(oldSur => !surfaces.Any(newSur => newSur.Matches(oldSur))))
    {
      _surfaces.Remove(toRemove);
    }
  }

  public static readonly ReadOnlyDictionary<EstateOwnership, EstateUnitOwnershipType[]> AllowedOwnershipTypes
    = new(new Dictionary<EstateOwnership, EstateUnitOwnershipType[]>()
      {
        {EstateOwnership.Freehold, new EstateUnitOwnershipType[] {
          EstateUnitOwnershipType.Property,
          EstateUnitOwnershipType.ThirdParties,
          EstateUnitOwnershipType.SurfaceRights,
        }},
        {EstateOwnership.ThirdParty, new EstateUnitOwnershipType[] {
          EstateUnitOwnershipType.ThirdParties,
          EstateUnitOwnershipType.RightOfUse
        }},
        {EstateOwnership.Leasing, new EstateUnitOwnershipType[] {
          EstateUnitOwnershipType.Leasing,
          EstateUnitOwnershipType.ThirdParties,
        }},
        {EstateOwnership.Mixed, new EstateUnitOwnershipType[] {
          EstateUnitOwnershipType.Leasing,
          EstateUnitOwnershipType.Loan,
          EstateUnitOwnershipType.Property,
          EstateUnitOwnershipType.RightOfUse,
          EstateUnitOwnershipType.SubsoilRights,
          EstateUnitOwnershipType.SurfaceRights,
          EstateUnitOwnershipType.ThirdParties
        }}
      });
}
