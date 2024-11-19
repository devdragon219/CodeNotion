using RealGimm.Core.CrossModule;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Prop.Models;

public sealed record TransactorInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public int SubjectId { get; set; }
  public int AddressId { get; set; }
  public int InvoiceAddressId { get; set; }
  public double TransactionSharePercent { get; set; }
  public bool IsInvoiced { get; set; }
  public DateOnly Since { get; set; }
  public DateOnly? Until { get; set; }
  public PaymentType Type { get; set; }
}
