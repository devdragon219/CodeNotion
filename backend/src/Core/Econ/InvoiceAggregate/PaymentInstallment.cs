using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Econ.InvoiceAggregate;

public class PaymentInstallment : EntityBase, IDateOnlyRanged
{
  public int InstallmentNumber { get; private set; }
  public DateOnly DueDate { get; private set; }
  public decimal Amount { get; private set; }
  [MaxLength(StrFieldSizes.NOTES), FuzzySearchable]
  public string? Notes { get; private set; }
  public DateOnly? Since { get; private set; }
  public DateOnly? Until { get; private set; }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    return Array.Empty<ValidationError>();
  }
}
