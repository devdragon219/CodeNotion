using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.CrossModule;

namespace RealGimm.Core.Econ.InvoiceAggregate;

public class Invoice : EntityBase, IAggregateRoot, IInternallyCoded, ISoftDeletable
{
  [FuzzySearchable, MaxLength(StrFieldSizes.NAME)]
  public string? Name { get; private set; }

  [Required, FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE)]
  public string InternalCode { get; private set; } = default!;

  public DateOnly Date { get; private set; }
  public DateOnly? Since { get; private set; }
  public DateOnly? Until { get; private set; }

  public int TransactorSubjectId { get; private set; }
  public int? EstateUnitId { get; private set; }
  public PaymentType TransactorPaymentType { get; private set; }
  public DateTime? DeletionDate { get; private set; }
  public int? TransactorBankAccountId { get; private set; }
  [MaxLength(StrFieldSizes.NOTES)]
  public string? PaymentTerms { get; private set; }
  public NullSafeCollection<PaymentInstallment> PaymentInstallments { get; private set; } = new();

  public void SetName(string? name) => Name = name;

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void MarkAsDeleted() => DeletionDate = DateTime.UtcNow;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (string.IsNullOrWhiteSpace(InternalCode))
    {
      yield return ErrorCode.CodeIsNullOrEmptyString.ToValidationError();
    }

    foreach (var installment in PaymentInstallments)
    {
      foreach (var validationError in installment.Validate())
      {
        yield return validationError;
      }
    }
  }
}
