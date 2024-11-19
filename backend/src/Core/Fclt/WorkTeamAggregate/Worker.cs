using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.WorkTeamAggregate;

public class Worker : EntityBase, IDateOnlyRanged
{
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME), Required]
  public string FirstName { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.NAME), Required]
  public string LastName { get; private set; } = default!;

  public DateOnly Since { get; private set; }
  public DateOnly? Until { get; private set; }

  DateOnly? IDateOnlyRanged.Since => Since;

  public Craft Craft { get; private set; } = default!;
  public QualificationLevel QualificationLevel { get; private set; } = default!;

  public void SetFirstName(string firstName) => FirstName = firstName;

  public void SetLastName(string lastName) => LastName = lastName;

  public void SetSince(DateOnly since) => Since = since;

  public void SetUntil(DateOnly? until) => Until = until;

  public void SetCraft(Craft craft) => Craft = craft;

  public void SetQualificationLevel(QualificationLevel qualificationLevel) => QualificationLevel = qualificationLevel;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(FirstName))
    {
      yield return ErrorCode.FirstNameIsNullOrEmptyString.ToValidationError();
    }

    if (string.IsNullOrWhiteSpace(LastName))
    {
      yield return ErrorCode.LastNameIsNullOrEmptyString.ToValidationError();
    }

    if (Until.HasValue && Since > Until)
    {
      yield return ErrorCode.SinceDateIsGreaterThanUntilDate.ToValidationError();
    }
  }
}
