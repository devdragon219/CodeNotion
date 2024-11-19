using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Asst.Models;

public record EstateTotalMarketValueCoefficientInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public EstateTotalMarketValueCoefficientType Type { get; init; }
  public decimal Value { get; init; }
}
