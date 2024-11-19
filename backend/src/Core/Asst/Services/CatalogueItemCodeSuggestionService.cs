using System.Text.RegularExpressions;
using HotChocolate.Language;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate.Specifications;
using RealGimm.Core.Asst.EstateAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.Services;
public class CatalogueItemCodeSuggestionService : ICodeSuggestor<CatalogueItem>
{
  private readonly IReadRepository<CatalogueItem> _repository;
  public CatalogueItemCodeSuggestionService(IReadRepository<CatalogueItem> repository)
  {
    _repository = repository;
  }

  public async Task<string> SuggestNextCode(int? parentId, string[] additionallyOccupiedCodes)
  {
    var concatCodes = new List<string?>(additionallyOccupiedCodes)
    {
      (await _repository
        .AsQueryable(new CatalogueItemMaxInternalCodeSpec())
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .SingleOrDefaultAsync())
        ?.InternalCode
    };

    var maxCode = concatCodes.Max();

    var actualNumber = string.IsNullOrEmpty(maxCode)
      ? Constants.MINIMUM_CODE_VALUE
      : !Regex.IsMatch(maxCode, "\\d+")
        ? Constants.MINIMUM_CODE_VALUE
        : Convert.ToInt32(Regex.Match(maxCode, "\\d+").Value);

    var proposedCode = "OG" + actualNumber.ToString().PadLeft(7, '0');

    while (additionallyOccupiedCodes.Contains(proposedCode) ||
      await _repository
        .AsQueryable(new GetByInternalCodeSpec<CatalogueItem>(proposedCode))
        .TagWith(Constants.SKIP_ACCESS_FILTER) 
        .SingleOrDefaultAsync() != null)
    {
      actualNumber++;
      proposedCode = "OG" + actualNumber.ToString().PadLeft(7, '0');
    }

    return proposedCode;
  }

  public async Task<string?> SuggestNextCode(int? parentId, CatalogueItem? partialEntity, string[]? additionallyOccupiedCodes)
  {
    return await SuggestNextCode(parentId, additionallyOccupiedCodes ?? Array.Empty<string>());
  }


  public string SuggestNextCode(string parentCode) => throw new NotImplementedException();
  public Task<string> SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes) => throw new NotImplementedException();
}
