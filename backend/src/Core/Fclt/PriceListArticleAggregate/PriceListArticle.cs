using Ardalis.Result;
using HotChocolate;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.SharedKernel.Attributes;
using RealGimm.SharedKernel.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace RealGimm.Core.Fclt.PriceListArticleAggregate;

public class PriceListArticle : EntityBase, IAggregateRoot, IInternallyCoded
{
  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE), Required]
  public string InternalCode { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.NAME), Required]
  public string Name { get; private set; } = default!;

  public PriceListMeasurementUnit MeasurementUnit { get; private set; } = default!;
  public PriceList PriceList { get; private set; } = default!;
  public NullSafeCollection<ArticlePricePeriod> PricePeriods { get; private set; } = [];
  public int[] CatalogueTypeIds { get; private set; } = default!;
  public decimal? ActualPrice => GetActualPricePeriod()?.Price;
  public DateOnly? ActualPriceSince => GetActualPricePeriod()?.Since;
  public DateOnly? ActualPriceUntil => GetActualPricePeriod()?.Until;

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetName(string name) => Name = name;

  public void SetCatalogueTypeIds(int[] catalogueTypeIds)
    => CatalogueTypeIds = catalogueTypeIds.Distinct().ToArray();
  
  public void SetMeasurementUnit(PriceListMeasurementUnit measurementUnit) => MeasurementUnit = measurementUnit;
  
  public void SetPriceList(PriceList priceList) => PriceList = priceList;

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (PricePeriods.Count == 0)
    {
      yield return ErrorCode.AtLeastOnePricePeriodRequired.ToValidationError();
    }

    if (PricePeriods.ContainsOverlaps())
    {
      yield return ErrorCode.PricePeriodsContainOverlaps.ToValidationError();
    }

    foreach (var pricePeriod in PricePeriods)
    {
      foreach (var validationError in pricePeriod.Validate())
      {
        yield return validationError;
      }
    }
  }

  private ArticlePricePeriod? GetActualPricePeriod()
  {
    var today = DateTime.Now.ToDateOnly();

    return PricePeriods
      .OrderByDescending(period => period.Since)
      .FirstOrDefault(period => today >= period.Since);
  }
}
