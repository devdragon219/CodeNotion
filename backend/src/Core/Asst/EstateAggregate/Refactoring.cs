using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Asst.EstateAggregate;

public class Refactoring : EntityBase
{
  [GraphQLIgnore]
  public Estate Estate { get; private set; } = default!;
  public int ReferenceYear { get; private set; }
  public int? BuildingPermitYear { get; private set; }
  public UnitCondition Condition { get; private set; }
  public double? AgeCoefficient { get; private set; }
  public int[] EstateUnitIds { get; private set; } = Array.Empty<int>();

  public void SetReferenceYear(int referenceYear)
  {
    ReferenceYear = referenceYear;
  }

  public void SetValues(int referenceYear, int? buildingPermitYear, UnitCondition condition, double? ageCoefficient)
  {
    ReferenceYear = referenceYear;
    BuildingPermitYear = buildingPermitYear;
    Condition = condition;
    AgeCoefficient = ageCoefficient;
  }

  public void SetEstateUnits(int[] estateUnitIds)
  {
    EstateUnitIds = estateUnitIds;
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (ReferenceYear < DataLimits.MIN_YEAR || ReferenceYear > DataLimits.MAX_YEAR)
    {
      yield return ErrorCode.InvalidReferenceYear.ToValidationError();
    }

    if (!EstateUnitIds.Any())
    {
      yield return ErrorCode.RefactoringEstateUnitsAreRequired.ToValidationError();
    }
  }
}
