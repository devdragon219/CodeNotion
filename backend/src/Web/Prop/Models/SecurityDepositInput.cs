using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Prop.Models;

public sealed record SecurityDepositInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public int? SubjectId { get; set; }
  public SecurityDepositType Type { get; set; }
  public DateOnly? Since { get; set; }
  public DateOnly? Until { get; set; }
  public decimal BaseAmount { get; set; }
  public bool IsInterestCalculated { get; set; }
  public DateOnly? InterestCalculationStartDate { get; set; }
  public DateOnly? TakeoverDate { get; set; }
  public int? SuretySubjectId { get; set; }
  public bool IsSuretyRenewable { get; set; }
  public int? BankAccountId { get; set; }
  public string? Notes { get; set; }
}
