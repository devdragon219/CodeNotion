using System.ComponentModel.DataAnnotations;
using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Asst.CadastralCategoryAggregate;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;

namespace RealGimm.Core.Asst.CadastralUnitAggregate;

public class CadastralUnitIncome
{
  public CadastralCategory? CadastralCategory { get; private set; }
  public CadastralLandCategory? CadastralLandCategory { get; private set; }

  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? MacroCategory { get; private set; }

  [MaxLength(StrFieldSizes.EXTERNAL_CODE)]
  public string? MicroCategory { get; private set; }

  public IncomeMetric? Metric { get; private set; }
  public decimal? MetricAmount { get; private set; }
  public decimal? MetricRentedAmount { get; private set; }
  public decimal? RegisteredSurface { get; private set; }
  public IncomeType? Type { get; private set; }
  public decimal? CadastralAmount { get; private set; }
  public decimal? FarmAmount { get; private set; }
  public decimal? LandAmount { get; private set; }
  public decimal? MarketValue { get; private set; }

  public void SetCadastralCategory(CadastralCategory? cadastralCategory) 
    => CadastralCategory = cadastralCategory;
  public void SetCadastralLandCategory(CadastralLandCategory? cadastralLandCategory) 
    => CadastralLandCategory = cadastralLandCategory;

  public void SetCategories(string? macro, string? micro)
  {
    MacroCategory = macro;
    MicroCategory = micro;
  }

  public void SetMetricsAmounts(IncomeMetric? metric, decimal? amount, decimal? rentedAmount, decimal? cadastralAmount)
  {
    Metric = metric;
    MetricAmount = amount;
    MetricRentedAmount = rentedAmount;
    CadastralAmount = cadastralAmount;
  }

  public void SetRegisteredSurface(decimal? registeredSurface) => RegisteredSurface = registeredSurface;

  public void SetType(IncomeType? type) => Type = type;

  public void SetFarmAmount(decimal? farmAmount) => FarmAmount = farmAmount;
  public void SetLandAmount(decimal? landAmount) => LandAmount = landAmount;
  public void SetMarketValue(decimal? marketValue) => MarketValue = marketValue;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (CadastralAmount.HasValue && CadastralAmount is <= 0)
    {
      yield return ErrorCode.CadastralAmountLessThanOrEqualsZero.ToValidationError();
    }
  }
}
