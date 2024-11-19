using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Nrgy.CostChargeAggregate;

public class CostCharge : EntityBase, IAggregateRoot, IDateOnlyRanged
{
  public UtilityService Service { get; private set; } = default!;
  
  public DateOnly PeriodStart { get; private set; }
  public DateOnly PeriodEnd { get; private set; }
  public decimal TotalAmount { get; private set; }
  public DateOnly ReferenceDate { get; private set; }
  public DateOnly DueDate { get; private set; }
  public string InvoiceNumber { get; private set; } = default!;
  public decimal TotalVATAmount { get; private set; }
  public decimal InvoicedConsumptionAmount { get; private set; }
  DateOnly? IDateOnlyRanged.Since => PeriodStart;
  DateOnly? IDateOnlyRanged.Until => PeriodEnd;
  public CostChargeConsumption? ActualConsumption { get; private set; }
  public CostChargeConsumption? ExpectedConsumption { get; private set; }
  public CostChargeField[] Fields { get; private set; } = Array.Empty<CostChargeField>();

  public void SetService(UtilityService service) => Service = service;

  public void SetPeriod(DateOnly start, DateOnly end)
  {
    PeriodStart = start;
    PeriodEnd = end;
  }

  public void SetTotalAmount(decimal totalAmount) => TotalAmount = totalAmount;

  public void SetReferenceDate(DateOnly referenceDate) => ReferenceDate = referenceDate;

  public void SetDueDate(DateOnly dueDate) => DueDate = dueDate;

  public void SetInvoiceNumber(string invoiceNumber)
    => InvoiceNumber = invoiceNumber ?? throw new ArgumentNullException(nameof(invoiceNumber));

  public void SetTotalVATAmount(decimal totalVATAmount) => TotalVATAmount = totalVATAmount;

  public void SetInvoicedConsumptionAmount(decimal invoicedConsumptionAmount)
    => InvoicedConsumptionAmount = invoicedConsumptionAmount;

  public void SetActualConsumption(CostChargeConsumption? actualConsumption) => ActualConsumption = actualConsumption;

  public void SetExpectedConsumption(CostChargeConsumption? expectedConsumption) => ExpectedConsumption = expectedConsumption;

  public void SetFields(CostChargeField[] fields)
    => Fields = fields ?? throw new ArgumentNullException(nameof(fields));

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    foreach (var field in Fields)
    {
      var validationErrors = field.Validate();
      foreach (var validationError in validationErrors)
      {
        yield return validationError;
      }
    }

    if (ActualConsumption is not null)
    {
      var validationErrors = ActualConsumption.Validate();
      foreach (var validationError in validationErrors)
      {
        yield return validationError;
      }
    }

    if (ExpectedConsumption is not null)
    {
      var validationErrors = ExpectedConsumption.Validate();
      foreach (var validationError in validationErrors)
      {
        yield return validationError;
      }
    }

    if (ActualConsumption is not null &&
      ExpectedConsumption is not null &&
      new[] { ActualConsumption, ExpectedConsumption }.ContainsOverlaps())
    {
      yield return ErrorCode.CostChargeConsumptionsContainsOverlaps.ToValidationError();
    }
  }
}
