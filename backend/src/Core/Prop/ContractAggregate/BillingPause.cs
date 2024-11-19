using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.ContractAggregate;

public class BillingPause : EntityBase, IDateOnlyRanged
{
  public DateOnly Since { get; private set; }
  public DateOnly? Until { get; private set; }
  public bool? IsRecoveryArrears { get; private set; }

  [MaxLength(StrFieldSizes.NOTES), FuzzySearchable]
  public string? Notes { get; private set; }

  DateOnly? IDateOnlyRanged.Since => Since;

  public void SetSince(DateOnly since) => Since = since;

  public void SetUntil(DateOnly? until) => Until = until;

  public void SetIsRecoveryArrears(bool isRecoveryArrears) => IsRecoveryArrears = isRecoveryArrears;

  public void SetNotes(string? notes) => Notes = notes;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (Until.HasValue && Until < Since)
    {
      yield return ErrorCode.BillingPauseEndDateCanNotBeLessThanStartDate.ToValidationError();
    }
  }
}
