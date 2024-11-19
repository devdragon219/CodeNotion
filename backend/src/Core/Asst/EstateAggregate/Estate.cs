using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.Core.Asst.EstateAggregate;

public class Estate : EntityBase, IAggregateRoot, IInternallyCoded, ISoftDeletable
{
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? Name { get; private set; }

  [Required, FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string InternalCode { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ExternalCode { get; private set; }

  public EstateStatus Status { get; private set; }
  public EstateType Type { get; private set; }
  public EstateOwnership Ownership { get; private set; }
  public EstateMainUsageType MainUsageType { get; private set; } = default!;
  public EstateUsageType UsageType { get; private set; } = default!;
  public int? SurfaceAreaSqM { get; private set; }
  public int? BuildYear { get; private set; }
  public DateOnly? DecommissioningDate { get; private set; }

  public int ManagementSubjectId { get; private set; }
  public int? ManagementOrgUnitId { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public DateTime? DeletionDate { get; private set; }

  public EstateTotalMarketValue? TotalMarketValue { get; private set; }

  private readonly List<Address> _addresses = new();
  private readonly List<Stair> _stairs = new();
  private readonly List<Floor> _floors = new();
  private readonly List<Valuation> _valuations = new();
  private readonly List<EstateUnit> _estateUnits = new();
  private readonly List<Refactoring> _refactorings = new();
  private readonly List<CatalogueItem> _catalogueItems = new();

  public IReadOnlyList<Address> Addresses => _addresses.AsReadOnly();
  public IReadOnlyList<Stair> Stairs => _stairs.AsReadOnly();
  public IReadOnlyList<Floor> Floors => _floors.AsReadOnly();
  public IReadOnlyList<Valuation> Valuations => _valuations.AsReadOnly();
  public IReadOnlyList<EstateUnit> EstateUnits => _estateUnits.AsReadOnly();
  public IReadOnlyList<Refactoring> Refactorings => _refactorings.AsReadOnly();
  public IReadOnlyList<CatalogueItem> CatalogueItems => _catalogueItems.AsReadOnly();

  [GraphQLIgnore]
  public Address? PrimaryAddress => Addresses
    .FirstOrDefault(address => address.AddressType is AddressType.Primary);

  public void SetName(string? name) => Name = name;

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetStatus(EstateStatus status) => Status = status;

  public void SetType(EstateType type) => Type = type;

  public void SetOwnership(EstateOwnership ownership) => Ownership = ownership;

  public void SetExternalCode(string? externalCode) => ExternalCode = externalCode;

  public void SetNotes(string? notes) => Notes = notes;

  public void SetMainUsageType(EstateMainUsageType mainUsage) => MainUsageType = mainUsage;

  public void SetManagement(int managementSubjectId, int? orgUnitId)
  {
    ManagementSubjectId = managementSubjectId;
    ManagementOrgUnitId = orgUnitId;
  }

  public void SetUsageType(EstateUsageType usageType) => UsageType = usageType;

  public void SetSurfaceArea(int? surfaceAreaSqM) => SurfaceAreaSqM = surfaceAreaSqM;

  public void SetBuildYear(int? buildYear) => BuildYear = buildYear;

  public void SetTotalMarketValue(EstateTotalMarketValue? totalMarketValue)
  {
    TotalMarketValue = totalMarketValue;
  }

  public void MarkAsDeleted() => DeletionDate = DateTime.UtcNow;

  public void SetDecommissioningDate(DateOnly? decommissioningDate) => DecommissioningDate = decommissioningDate;

  public void AddAddress(Address address)
  {
    ArgumentNullException.ThrowIfNull(address);

    _addresses.Add(address);
  }

  public void RemoveAddress(Address address)
  {
    ArgumentNullException.ThrowIfNull(address);

    if (address.EstateUnit?.Any() ?? false)
    {
      throw new ArgumentException("The address is in use by some EstateUnits", nameof(address));
    }

    _addresses.Remove(address);
  }

  public void AddStairs(Stair stair)
  {
    ArgumentNullException.ThrowIfNull(stair);

    _stairs.Add(stair);
  }

  public void RemoveStairs(Stair stair)
  {
    ArgumentNullException.ThrowIfNull(stair);

    _stairs.Remove(stair);
  }

  public void AddFloor(Floor floor)
  {
    ArgumentNullException.ThrowIfNull(floor);

    _floors.Add(floor);
  }

  public void RemoveFloor(Floor floor)
  {
    ArgumentNullException.ThrowIfNull(floor);

    _floors.Remove(floor);
  }

  public void AddCatalogueItem(CatalogueItem item)
  {
    ArgumentNullException.ThrowIfNull(item);

    _catalogueItems.Add(item);
  }

  public void RemoveCatalogueItem(CatalogueItem item)
  {
    ArgumentNullException.ThrowIfNull(item);

    _catalogueItems.Remove(item);
  }

  public void AddValuation(Valuation valuation)
  {
    ArgumentNullException.ThrowIfNull(valuation);

    _valuations.Add(valuation);
  }

  public void AddEstateUnit(EstateUnit unit)
  {
    ArgumentNullException.ThrowIfNull(unit);

    _estateUnits.Add(unit);
  }

  public void AddRefactoring(Refactoring refactoring)
  {
    ArgumentNullException.ThrowIfNull(refactoring);

    _refactorings.Add(refactoring);
  }

  public void RemoveRefactoring(Refactoring refactoring)
  {
    ArgumentNullException.ThrowIfNull(refactoring);

    _refactorings.Remove(refactoring);
  }

  public void ClearAddresses() => _addresses.Clear();

  public void ClearStairs() => _stairs.Clear();

  public void ClearFloors() => _floors.Clear();

  public void ClearValuations() => _valuations.Clear();

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (SurfaceAreaSqM is not null && SurfaceAreaSqM <= 0)
    {
      yield return ErrorCode.SurfaceAreaLessThanOrEqualsZero.ToValidationError();
    }

    if (BuildYear is not null && BuildYear <= 0)
    {
      yield return ErrorCode.BuildYearLessThanOrEqualsZero.ToValidationError();
    }

    if (DecommissioningDate is not null && DecommissioningDate > DateOnly.FromDateTime(DateTime.Today.AddDays(1)))
    {
      yield return ErrorCode.DecommissioningDateIsInTheFuture.ToValidationError();
    }

    if(UsageType is not null && !UsageType.IsForEstate)
    {
      yield return ErrorCode.UsageTypeNotForThisEntity.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.CodeIsNullOrEmptyString.ToValidationError();
    }

    foreach (var address in Addresses)
    {
      foreach (var validation in address.Validate())
      {
        yield return validation;
      }
    }

    foreach (var valuation in Valuations)
    {
      foreach (var validation in valuation.Validate())
      {
        yield return validation;
      }
    }

    foreach (var refac in Refactorings)
    {
      foreach (var validation in refac.Validate())
      {
        yield return validation;
      }
    }

    if (!Addresses.Any(address => address.AddressType is AddressType.Primary))
    {
      yield return ErrorCode.PrimaryAddressIsNotProvided.ToValidationError();
    }
  }

  public void RemoveValuation(Valuation? valuation)
  {
    ArgumentNullException.ThrowIfNull(valuation);

    _valuations.Remove(valuation);
  }
}
