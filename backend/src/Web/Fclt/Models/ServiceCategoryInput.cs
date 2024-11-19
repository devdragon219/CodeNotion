using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public class ServiceCategoryInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public string? Name { get; set; }
  public string InternalCode { get; set; } = default!;
  public ServiceSubCategoryInput[] SubCategories { get; init; } = [];
}
