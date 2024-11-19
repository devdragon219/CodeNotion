using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueCategoryAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.Services;

public class CatalogueSubCategoryCodeSuggestionService : ICodeSuggestor<CatalogueSubCategory>
{
  private readonly IReadRepository<CatalogueCategory> _categoryRepo;

  public CatalogueSubCategoryCodeSuggestionService(IReadRepository<CatalogueCategory> categoryRepo)
  {
    _categoryRepo = categoryRepo;
  }

  public async Task<string> SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes)
  {
    var parent = await _categoryRepo
      .AsQueryable(new GetByInternalCodeSpec<CatalogueCategory>(parentCode), new CatalogueCategoryIncludeAllSpec())
      .FirstOrDefaultAsync();

    var occupiedCodes = parent is not null ? parent.SubCategories.Select(e => e.InternalCode).Concat(additionallyOccupiedCodes) : additionallyOccupiedCodes;
    var maxCode = occupiedCodes.DefaultIfEmpty().Max();

    var actualNumber = string.IsNullOrEmpty(maxCode)
      ? 0
      : !Regex.IsMatch(maxCode, "\\d+$")
        ? 0
        : Convert.ToInt32(Regex.Match(maxCode, "\\d+$").Value);

    var proposedCode = parentCode + "SC" + actualNumber.ToString().PadLeft(3, '0');
    while (occupiedCodes.Any(code => code == proposedCode))
    {
      actualNumber++;
      proposedCode = parentCode + "SC" + actualNumber.ToString().PadLeft(3, '0');
    }

    return proposedCode;
  }

  public Task<string> SuggestNextCode(int? parentId, string[] additionalOccupiedCodes) => throw new NotImplementedException();

  public Task<string?> SuggestNextCode(int? parentId, CatalogueSubCategory? partialEntity, string[]? additionallyOccupiedCodes)
    => throw new NotImplementedException();

  public string SuggestNextCode(string parentCode) => throw new NotImplementedException();
}
