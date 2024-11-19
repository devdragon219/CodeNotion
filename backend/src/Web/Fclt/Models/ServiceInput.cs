using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public class ServiceInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public string? Name { get; set; }
  public string InternalCode { get; set; } = default!;
  public int CategoryId { get; init; }
  public int SubCategoryId { get; init; }
  public ServiceActivityInput[] Activities { get; init; } = [];
}
