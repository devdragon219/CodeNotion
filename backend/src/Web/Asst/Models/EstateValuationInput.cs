using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Web.Asst.Models;

public record EstateValuationInput : IMaybeIdentifiable
{
  public int? Id { get; init; }
  public int Year { get; init; }
  public decimal? Rba { get; init; }
  public decimal? Ias { get; init; }
  public decimal? MortgageAmount { get; init; }
  public int? TransferYear { get; init; }
  public int? RevampOperations { get; init; }
}
