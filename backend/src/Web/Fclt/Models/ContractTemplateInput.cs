namespace RealGimm.Web.Fclt.Models;

public record ContractTemplateInput
{
  public string Description { get; set; } = default!;
  public string InternalCode { get; set; } = default!;
  public int ContractTypeId { get; set; }
  public int[] CatalogueTypeIds { get; set; } = [];
  public int[] SLAIds { get; set; } = default!;
  public int[] PenaltyIds { get; set; } = default!;
}
