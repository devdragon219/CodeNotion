namespace RealGimm.Web.Prop.Models;

public sealed record ContractNoDateUpdateCounterpartInput
{
  public int Id { get; set; }
  public bool IsMainCounterpart { get; set; }
  public double ContractSharePercent { get; set; }
}
