using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.Services;
public class CatalogueTypeCodeSuggestionService : ICodeSuggestor<CatalogueType>
{
  private readonly IReadRepository<CatalogueType> _repository;
  public CatalogueTypeCodeSuggestionService(IReadRepository<CatalogueType> repository)
  {
    _repository = repository;
  }

  public async Task<string?> SuggestNextCode(int? parentId, CatalogueType? partialEntity, string[]? additionallyOccupiedCodes)
  {
    var maxCode = (await _repository
      .AsQueryable(new CatalogueTypeMaxInternalCodeSpec())
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .SingleOrDefaultAsync())
      ?.InternalCode;

    var actualNumber = string.IsNullOrEmpty(maxCode)
      ? Constants.MINIMUM_CODE_VALUE
      : !Regex.IsMatch(maxCode, "\\d+")
        ? Constants.MINIMUM_CODE_VALUE
        : Convert.ToInt32(Regex.Match(maxCode, "\\d+").Value);

    var proposedCode = "TO" + actualNumber.ToString().PadLeft(5, '0');

    while ((additionallyOccupiedCodes != null && additionallyOccupiedCodes.Contains(proposedCode)) ||
      await _repository
        .AsQueryable(new GetByInternalCodeSpec<CatalogueType>(proposedCode))
        .TagWith(Constants.SKIP_ACCESS_FILTER) 
        .SingleOrDefaultAsync() != null)
    {
      actualNumber++;
      proposedCode = "TO" + actualNumber.ToString().PadLeft(5, '0');
    }

    return proposedCode;
  }

  public Task<string> SuggestNextCode(int? parentId, string[] additionallyOccupiedCodes) => throw new NotImplementedException();
  public Task<string> SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes) => throw new NotImplementedException();

  public string SuggestNextCode(string parentCode) => throw new NotImplementedException();
}
