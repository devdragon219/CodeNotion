using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Nrgy.UtilityTypeAggregate;

public class UtilityType : EntityBase, IAggregateRoot, IInternallyCoded
{
  public UtilityCategory Category { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.DESCRIPTION)]
  public string Description { get; private set; } = default!;

  [Required, FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string InternalCode { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ExternalCode { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? ExpenseClass { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string MeasurementUnit { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string MeasurementUnitDescription { get; private set; } = default!;

  public int TimeOfUseRateCount { get; private set; }
  public MeteringType MeteringType { get; private set; }
  public bool HasHeatingAccountingSystem { get; private set; }

  public UtilityChargeField[][]? ChargeFields { get; private set; }

  public void SetExternalCode(string? externalCode) => ExternalCode = externalCode;

  public void SetData(UtilityCategory category,
    string description,
    string code,
    string? expClass)
  {
    Category = category;
    Description = description;
    InternalCode = code;
    ExpenseClass = expClass;
  }

  public void SetMeasurement(string unit,
    string unitDescription,
    int touRateCount,
    MeteringType type,
    bool hasHeatingAcct)
  {
    MeasurementUnit = unit;
    MeasurementUnitDescription = unitDescription;
    TimeOfUseRateCount = touRateCount;
    MeteringType = type;
    HasHeatingAccountingSystem = hasHeatingAcct;
  }

  public void SetFields(UtilityChargeField[][]? fields) => ChargeFields = fields;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.CodeIsNullOrEmptyString.ToValidationError();
    }

    if (MeasurementUnit is not null && (TimeOfUseRateCount < 1 || TimeOfUseRateCount > 25))
    {
      yield return ErrorCode.InvalidTimeOfUseRateCount.ToValidationError();
    }
  }
}
