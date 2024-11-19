using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.Services;
public class CatalogueCategoryCodeSuggestionService : ICodeSuggestor<CatalogueCategory>
{
  private readonly IReadRepository<CatalogueCategory> _repository;
  public CatalogueCategoryCodeSuggestionService(IReadRepository<CatalogueCategory> repository)
  {
    _repository = repository;
  }

  public async Task<string?> SuggestNextCode(int? parentId, CatalogueCategory? partialEntity, string[]? additionallyOccupiedCodes)
  {
    var maxCode = (await _repository
      .AsQueryable(new CatalogueCategoryMaxInternalCodeSpec())
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .SingleOrDefaultAsync())?.InternalCode;

    var actualNumber = string.IsNullOrEmpty(maxCode)
      ? Constants.MINIMUM_CODE_VALUE
      : !Regex.IsMatch(maxCode, "\\d+")
        ? Constants.MINIMUM_CODE_VALUE
        : Convert.ToInt32(Regex.Match(maxCode, "\\d+").Value);

    var proposedCode = "CO" + actualNumber.ToString().PadLeft(5, '0');

    while ((additionallyOccupiedCodes != null && additionallyOccupiedCodes.Contains(proposedCode)) ||
      await _repository
        .AsQueryable(new GetByInternalCodeSpec<CatalogueCategory>(proposedCode))
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .SingleOrDefaultAsync() != null)
    {
      actualNumber++;
      proposedCode = "CO" + actualNumber.ToString().PadLeft(5, '0');
    }

    return proposedCode;
  }

  public Task<string> SuggestNextCode(int? parentId, string[] additionallyOccupiedCodes) => throw new NotImplementedException();
  public Task<string> SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes) => throw new NotImplementedException();

  public string SuggestNextCode(string parentCode) => throw new NotImplementedException();
}
