using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.AdministrationTermAggregate;

public class AdministrationTerm : EntityBase, IAggregateRoot, IDateOnlyRanged
{
  public Administration Administration { get; private set; } = default!;
  public TermType TermType { get; private set; }

  [MaxLength(StrFieldSizes.NAME), FuzzySearchable]
  public string Name { get; private set; } = default!;

  public DateOnly Since { get; private set; }
  public DateOnly Until { get; private set; }
  DateOnly? IDateOnlyRanged.Since => Since;
  DateOnly? IDateOnlyRanged.Until => Until;
  public decimal ExpectedAmount { get; private set; }
  public NullSafeCollection<TermInstallment> Installments { get; private set; } = new();

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (Since >= Until)
    {
      yield return ErrorCode.AdministrationTermSinceMustBeLessThanUntil.ToValidationError();
    }

    if (ExpectedAmount <= 0)
    {
      yield return ErrorCode.AdministrationTermExpectedAmountMustBeGreaterThanZero.ToValidationError();
    }

    foreach (var installment in Installments)
    {
      foreach (var validationError in installment.Validate())
      {
        yield return validationError;
      }
    }
  }

  public void SetAdministration(Administration administration) => Administration = administration;

  public void SetTermType(TermType termType) => TermType = termType;

  public void SetName(string name) => Name = name;

  public void SetSince(DateOnly since) => Since = since;

  public void SetUntil(DateOnly until) => Until = until;

  public void SetExpectedAmount(decimal expectedAmount) => ExpectedAmount = expectedAmount;

  public void AddInstallment(TermInstallment termInstallment) => Installments.Add(termInstallment);
  public void AddInstallments(IEnumerable<TermInstallment> termInstallments) => Installments.AddRange(termInstallments);
}
