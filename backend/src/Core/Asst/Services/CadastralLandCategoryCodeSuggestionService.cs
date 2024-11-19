using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Asst.Services;
public class CadastralLandCategoryCodeSuggestionService : CodeSuggestorBase<CadastralLandCategory>
{
  public CadastralLandCategoryCodeSuggestionService(IReadRepository<CadastralLandCategory> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, CadastralLandCategory? partialEntity)
    => $"CLC{unoccupiedNumber.ToString().PadLeft(3, '0')}";
}
