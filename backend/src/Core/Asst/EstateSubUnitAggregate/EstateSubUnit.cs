using System.ComponentModel.DataAnnotations;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using HotChocolate;
using Ardalis.Result;

namespace RealGimm.Core.Asst.EstateSubUnitAggregate;

public class EstateSubUnit : EntityBase, IAggregateRoot, IInternallyCoded, ISoftDeletable
{
  [MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string InternalCode { get; private set; }
  public OccupantType? OccupantType { get; private set; }
  public int? OccupantId { get; private set; }
  public EstateUsageType? UsageType { get; private set; }
  public EstateUnit EstateUnit { get; private set; } = default!;
  public int? OrgUnitId { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public DateOnly? Since { get; private set; }
  public DateOnly? Until { get; private set; }
  public DateTime? DeletionDate { get; private set; }
  public int? SurfaceSqM { get;private set; }
  public int? OccupancyPercent { get; private set; }

  public EstateSubUnit(string internalCode)
  {
    InternalCode = internalCode;
  }

  public EstateSubUnit(int id, string internalCode)
  {
    Id = id;
    InternalCode = internalCode;
  }

  public void SetOccupancyDates(DateOnly? since, DateOnly? until)
  {
    Since = since;
    Until = until;
  }

  public void SetSurface(int? squareMt)
  {
    SurfaceSqM = squareMt;
  }

  public void Delete()
  {
    DeletionDate = DateTime.UtcNow;
  }

  public void SetUsageType(EstateUsageType? type)
  {
    UsageType = type;
  }

  public void SetEstateUnit(EstateUnit estateUnit)
    => EstateUnit = estateUnit ?? throw new ArgumentNullException(nameof(estateUnit));

  public void SetNotes(string? notes)
  {
    Notes = notes;
  }

  public void SetOccupancy(OccupantType? type, int? occupantId, int? occupancyPercent)
  {
    OccupantType = type;
    OccupantId = occupantId;
    OccupancyPercent = occupancyPercent;
  }

  public void SetOrgUnitId(int? orgUnitId)
  {
    OrgUnitId = orgUnitId;
  }

  public void MarkAsDeleted() => DeletionDate = DateTime.UtcNow;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if(UsageType is not null && !UsageType.IsForEstateSubUnit)
    {
      yield return ErrorCode.UsageTypeNotForThisEntity.ToValidationError();
    }
  }
}
