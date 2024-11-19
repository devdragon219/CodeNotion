using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Anag.SubjectAggregate;

public class TaxStatus : EntityBase, IDateOnlyRanged
{
  [GraphQLIgnore]
  public int SubjectId { get; private set; }
  public TaxStatusType TaxStatusType { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.NOTES)]
  public string? Notes { get; private set; }

  public DateOnly? Since { get; private set; }
  public DateOnly? Until { get; private set; }

  public void SetType(TaxStatusType type) => TaxStatusType = type;

  public void SetNotes(string? notes) => Notes = notes;

  public void SetValidityDates(DateOnly? start, DateOnly? end)
  {
    Since = start;
    Until = end;
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (Since.HasValue && Until.HasValue && Until.Value <= Since.Value)
    {
      yield return ErrorCode.StartDateAfterEndDate.ToValidationError();
    }
  }
}
