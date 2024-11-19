using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.Services;
public class EstateCodeSuggestionService : ICodeSuggestor<Estate>
{
  private readonly IReadRepository<Estate> _repository;
  public EstateCodeSuggestionService(IReadRepository<Estate> repository)
  {
    _repository = repository;
  }

  public async Task<string?> SuggestNextCode(int? parentId, Estate? partialEntity, string[]? additionallyOccupiedCodes)
  {
    var maxCode = (await _repository
      .AsQueryable(new EstateMaxInternalCodeSpec())
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .SingleOrDefaultAsync())
      ?.InternalCode;

    var actualNumber = string.IsNullOrEmpty(maxCode)
      ? Constants.MINIMUM_CODE_VALUE
      : !Regex.IsMatch(maxCode, "\\d+")
        ? Constants.MINIMUM_CODE_VALUE
        : Convert.ToInt32(Regex.Match(maxCode, "\\d+").Value);

    var proposedCode = "I" + actualNumber.ToString().PadLeft(5, '0');

    while ((additionallyOccupiedCodes != null && additionallyOccupiedCodes.Contains(proposedCode)) ||
      await _repository
        .AsQueryable(new GetByInternalCodeSpec<Estate>(proposedCode))
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .SingleOrDefaultAsync() != null)
    {
      actualNumber++;
      proposedCode = "I" + actualNumber.ToString().PadLeft(5, '0');
    }

    return proposedCode;
  }

  public Task<string> SuggestNextCode(int? parentId, string[] additionallyOccupiedCodes) => throw new NotImplementedException();
  public Task<string> SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes) => throw new NotImplementedException();

  public string SuggestNextCode(string parentCode) => throw new NotImplementedException();
}
