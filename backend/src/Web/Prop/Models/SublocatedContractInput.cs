using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Web.Prop.Models;

public class SublocatedContractInput
{
  public int Id { get; set; }
  public int? FirstTermDurationMonths { get; set; }
  public int? SecondTermDurationMonths { get; set; }
  public DateOnly? FirstTermExpirationDate { get; set; }
  public DateOnly? SecondTermExpirationDate { get; set; }
  public int? AnytimeTerminationWarningMonths { get; set; }
  public int? NonRenewalWarningMonths { get; set; }
  public DateOnly? TerminationDate { get; set; }
  public ContractTerminator? Terminator { get; set; }
}
