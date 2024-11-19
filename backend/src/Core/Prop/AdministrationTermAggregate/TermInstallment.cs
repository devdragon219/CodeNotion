using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Prop.AdministrationTermAggregate;

public class TermInstallment : EntityBase, IDateOnlyRanged
{
  public AdministrationTerm AdministrationTerm { get; private set; } = default!;

  public int InstallmentNumber { get; private set; }
  public DateOnly DueDate { get; private set; }
  public decimal Amount { get; private set; }

  [MaxLength(StrFieldSizes.NOTES), FuzzySearchable]
  public string? Notes { get; private set; }

  public DateOnly Since { get; private set; }
  public DateOnly Until { get; private set; }
  public BillItemType BillItemType { get; private set; } = default!;
  DateOnly? IDateOnlyRanged.Since => Since;
  DateOnly? IDateOnlyRanged.Until => Until;

  public NullSafeCollection<BillRow> Payments { get; private set; } = [];

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (Since > Until)
    {
      yield return ErrorCode.TermInstallmentSinceMustBeLessThanOrEqualToUntil.ToValidationError();
    }
  }

  public void SetAdministrationTerm(AdministrationTerm administrationTerm) => AdministrationTerm = administrationTerm;

  public void SetInstallmentNumber(int installmentNumber) => InstallmentNumber = installmentNumber;

  public void SetDueDate(DateOnly dueDate) => DueDate = dueDate;

  public void SetAmount(decimal amount) => Amount = amount;

  public void SetNotes(string? notes) => Notes = notes;

  public void SetSince(DateOnly since) => Since = since;

  public void SetUntil(DateOnly until) => Until = until;

  public void SetBillItemType(BillItemType billItemType) => BillItemType = billItemType;
}
