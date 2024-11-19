using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Fclt.ContractAggregate;

public class TermExtension : EntityBase
{
  public int DaysCount { get; private set; }
  public decimal? FeeDifference { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public void SetDaysCount(int daysCount) => DaysCount = daysCount;

  public void SetFeeDifference(decimal? feeDifference) => FeeDifference = feeDifference;

  public void SetNotes(string? notes) => Notes = notes;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (DaysCount <= 0)
    {
      yield return ErrorCode.DaysCountIsLessThanOrEqualToZero.ToValidationError();
    }
  }
}
