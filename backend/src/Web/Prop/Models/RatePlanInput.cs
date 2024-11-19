using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Prop.Models;

public sealed record RatePlanInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public DateOnly Since { get; set; }
  public decimal NewYearlyRate { get; set; }
  public bool IsDeclarationExpected { get; set; }
}
