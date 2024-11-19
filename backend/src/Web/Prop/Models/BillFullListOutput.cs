namespace RealGimm.Web.Prop.Models;

public record BillFullListOutput
{
  public required int Id { get; init; }
  public required int ContractId { get; init; }
  public required string ContractInternalCode { get; init; } = default!;
  public required int ContractManagementSubjectId { get; init; }
  public required int MainCounterpartSubjectId { get; init; }
  public required DateOnly? Since { get; init; }
}
