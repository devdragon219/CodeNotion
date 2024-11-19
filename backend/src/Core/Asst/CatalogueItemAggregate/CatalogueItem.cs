using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.CatalogueItemAggregate;

public class CatalogueItem : EntityBase, IAggregateRoot, IInternallyCoded
{
  public Estate Estate { get; private set; } = default!;
  public CatalogueType CatalogueType { get; private set; } = default!;

  [Required, FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string InternalCode { get; private set; } = default!;

  public EstateStatus Status { get; private set; }
  public DateOnly ActivationDate { get; private set; }
  public DateOnly LastMaintenanceDate { get; private set; }
  public DateOnly? DecommissioningDate { get; private set; }
  public CatalogueItemField[] Fields { get; private set; } = []; 

  public void SetEstate(Estate estate) => Estate = estate;

  public void SetType(CatalogueType type) => CatalogueType = type;

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetStatus(EstateStatus status) => Status = status;

  public void SetActivationDate(DateOnly activationDate) => ActivationDate = activationDate;

  public void SetLastMaintenanceDate(DateOnly lastMaintenance) => LastMaintenanceDate = lastMaintenance;
  
  public void SetDecommissioningDate(DateOnly? decommissioningDate) => DecommissioningDate = decommissioningDate;
  
  public void SetFields(CatalogueItemField[] fields)
    => Fields = fields ?? throw new ArgumentNullException(nameof(fields));

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.CatalogueItemInternalCodeIsNullOrEmptyString.ToValidationError();
    }

    if ((Status is EstateStatus.Decommissioned) != DecommissioningDate.HasValue)
    {
      yield return ErrorCode.CatalogueItemInvalidDecommissioningDate.ToValidationError();
    }

    if (ActivationDate.Year is < DataLimits.MIN_YEAR or > DataLimits.MAX_YEAR)
    {
      yield return ErrorCode.CatalogueItemInvalidActivationDate.ToValidationError();
    }

    if (LastMaintenanceDate < ActivationDate || LastMaintenanceDate.Year is < DataLimits.MIN_YEAR or > DataLimits.MAX_YEAR)
    {
      yield return ErrorCode.CatalogueItemInvalidLastMaintenanceDate.ToValidationError();
    }

    if (DecommissioningDate.HasValue && DecommissioningDate.Value.Year is < DataLimits.MIN_YEAR or > DataLimits.MAX_YEAR)
    {
      yield return ErrorCode.CatalogueItemInvalidDecommissioningDate.ToValidationError();
    }

    foreach (var field in Fields)
    {
      var validationErrors = field.Validate();
      foreach (var validationError in validationErrors)
      {
        yield return validationError;
      }
    }
  }
}
