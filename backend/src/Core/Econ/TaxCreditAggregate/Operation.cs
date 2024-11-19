using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Econ.TaxCreditAggregate;

public class Operation : EntityBase, IDateOnlyRanged
{
  public DateOnly Date { get; private set; }
  public decimal Amount { get; private set; }
  public int? AssetTaxPaymentId { get; private set; }

  [MaxLength(StrFieldSizes.NOTES), FuzzySearchable]
  public string? Notes { get; private set; }

  public DateOnly? Since { get; private set; }
  public DateOnly? Until { get; private set; }

  public void SetDate(DateOnly date) => Date = date;

  public void SetAmount(decimal amount) => Amount = amount;

  public void SetAssetTaxPaymentId(int? assetTaxPaymentId) => AssetTaxPaymentId = assetTaxPaymentId;

  public void SetNotes(string? notes) => Notes = notes;

  public void SetSince(DateOnly? since) => Since = since;

  public void SetUntil(DateOnly? until) => Until = until;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate() => [];
}
