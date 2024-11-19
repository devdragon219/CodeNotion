using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public record ArticlePricePeriodInput : IMaybeIdentifiable
{
  public int? Id { get; set; }
  public DateOnly Since { get; set; }
  public DateOnly? Until { get; set; }
  public decimal Price { get; set; }
}
