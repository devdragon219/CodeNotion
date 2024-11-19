using RealGimm.Core.CrossModule;
using RealGimm.Core.Prop.AdministrationAggregate;

namespace RealGimm.Web.Prop.Models;

public record AdministrationInput
{
  public int EstateId { get; set; }
  public int AdministratorSubjectId { get; set; }
  public int? AdministratorBankAccountId { get; set; }
  public AdministrationType AdministrationType { get; set; }
  public PaymentType PaymentType { get; set; }
  public DateOnly Since { get; set; }
  public DateOnly? Until { get; set; }
  public string? Notes { get; set; }
  public bool IsPaymentDataIncluded { get; set; }
}
