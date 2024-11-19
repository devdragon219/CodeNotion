using RealGimm.Core;
using RealGimm.Core.Asst.CadastralCategoryAggregate;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Web.Asst.Models;
using RealGimm.WebCommons.Mapping;

namespace RealGimm.Web.Asst.Mapping;

public class CadastralUnitIncomeMapper : IMapper<CadastralUnitIncomeInput, CadastralUnitIncome>
{
  public required IReadRepository<CadastralCategory> _cadastralCategories { protected get; init; }
  public required IReadRepository<CadastralLandCategory> _cadastralLandCategories { protected get; init; }
  public async Task<CadastralUnitIncome?> MapAsync(CadastralUnitIncomeInput? from, CadastralUnitIncome? into, CancellationToken cancellationToken = default)
  {
    if (from is null)
    {
      return null;
    }

    var income = into ?? new CadastralUnitIncome();
    income.SetCategories(from.MacroCategory, from.MicroCategory);
    income.SetMetricsAmounts(from.Metric,
      from.MetricAmount,
      from.MetricRentedAmount,
      from.CadastralAmount);
    income.SetRegisteredSurface(from.RegisteredSurface);
    income.SetCadastralCategory(
      from.CadastralCategoryId.HasValue
      ? await _cadastralCategories.GetByIdAsync(from.CadastralCategoryId.Value, cancellationToken)
      : null);
    income.SetCadastralLandCategory(
      from.CadastralLandCategoryId.HasValue
      ? await _cadastralLandCategories.GetByIdAsync(from.CadastralLandCategoryId.Value, cancellationToken)
      : null);
    income.SetFarmAmount(from.FarmAmount);
    income.SetLandAmount(from.LandAmount);
    income.SetMarketValue(from.MarketValue);
    income.SetType(from.Type);

    return income;
  }
}
