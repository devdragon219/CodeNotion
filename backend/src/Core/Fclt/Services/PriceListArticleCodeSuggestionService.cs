using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public class PriceListArticleCodeSuggestionService : CodeSuggestorBase<PriceListArticle>
{
  public PriceListArticleCodeSuggestionService(IReadRepository<PriceListArticle> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, PriceListArticle? partialEntity)
    => $"AR{unoccupiedNumber.ToString().PadLeft(3, '0')}";
}
