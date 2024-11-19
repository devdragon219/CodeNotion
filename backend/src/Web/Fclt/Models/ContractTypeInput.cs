namespace RealGimm.Web.Fclt.Models;

[GraphQLName($"{nameof(Fclt)}{nameof(ContractTypeInput)}")]
public record ContractTypeInput
{
  public string Name { get; set; } = default!;
  public string InternalCode { get; set; } = default!;
  public int Ordering { get; set; }
}
