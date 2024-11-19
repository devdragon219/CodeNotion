using System.ComponentModel.DataAnnotations;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.SharedKernel.Attributes;

namespace RealGimm.Core.Fclt.TicketAggregate;

public class QuoteArticle : EntityBase
{
  public PriceListArticle? SourceArticle { get; private set; }

  [FuzzySearchable, MaxLength(StrFieldSizes.INTERNAL_CODE), Required]
  public string InternalCode { get; private set; } = default!;

  [FuzzySearchable, MaxLength(StrFieldSizes.NAME), Required]
  public string Name { get; private set; } = default!;
  
  public int Quantity { get; private set; }
  public int Ordering { get; private set; }
  public PriceListMeasurementUnit MeasurementUnit { get; private set; } = default!;
  public decimal UnitPrice { get; private set; }
  public bool IsExcluded { get; private set; }

  public void SetSourceArticle(PriceListArticle? sourceArticle) => SourceArticle = sourceArticle;

  public void SetInternalCode(string internalCode) => InternalCode = internalCode;

  public void SetName(string name) => Name = name;

  public void SetQuantity(int quantity) => Quantity = quantity;
  
  public void SetOrdering(int ordering) => Ordering = ordering;

  public void SetMeasurementUnit(PriceListMeasurementUnit measurementUnit) => MeasurementUnit = measurementUnit;

  public void SetUnitPrice(decimal unitPrice) => UnitPrice = unitPrice;

  public void SetIsExcluded(bool isExcluded) => IsExcluded = isExcluded;
}
