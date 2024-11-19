using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public record FrameworkAgreementInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public string ExternalCode { get; set; } = default!;
  public string? Notes { get; set; }
}
