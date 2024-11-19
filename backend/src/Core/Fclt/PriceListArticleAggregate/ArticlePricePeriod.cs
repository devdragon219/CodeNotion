using Ardalis.Result;
using HotChocolate;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.PriceListArticleAggregate;

public class ArticlePricePeriod : EntityBase, IDateOnlyRanged
{
  public DateOnly Since { get; private set; }
  DateOnly? IDateOnlyRanged.Since => Since;

  public DateOnly? Until { get; private set; }
  public decimal Price { get; private set; }

  public void SetSince(DateOnly since)
  {
    Since = since;
  }

  public void SetUntil(DateOnly? until)
  {
    Until = until;
  }
  
  public void SetPrice(decimal price)
  {
    Price = price;
  }

  [GraphQLIgnore]
  public IEnumerable<ValidationError> Validate()
  {
    if (Until.HasValue && Since > Until)
    {
      yield return ErrorCode.PricePeriodSinceGreaterThanUntil.ToValidationError();
    }

    if (Price <= 0)
    {
      yield return ErrorCode.PriceIsLessThanOrEqualToZero.ToValidationError();
    }
  }
}
