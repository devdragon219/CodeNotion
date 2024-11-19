using RealGimm.Core.Fclt.ServiceAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Fclt.Models;

public record ServiceActivityInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public string? Name { get; init; }
  public ServiceActivityType ActivityType { get; init; }
  public bool IsMandatoryByLaw { get; init; }
}
