using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Asst.Models;

public record EstateMarketValueInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public EstateMarketValueType Type { get; init; }
  public decimal Value { get; init; }
}
