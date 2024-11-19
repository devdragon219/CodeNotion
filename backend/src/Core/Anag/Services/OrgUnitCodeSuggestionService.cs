using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Anag.Services;
public class OrgUnitCodeSuggestionService : ICodeSuggestor<OrgUnit>
{
  private readonly IReadRepository<OrgUnit> _repository;
  public OrgUnitCodeSuggestionService(IReadRepository<OrgUnit> repository)
  {
    _repository = repository;
  }

  public async Task<string?> SuggestNextCode(int? parentId, OrgUnit? partialEntity, string[]? additionallyOccupiedCodes)
  {
    var maxCode = (await _repository
      .AsQueryable(new OrgUnitMaxInternalCodeSpec())
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .SingleOrDefaultAsync())
      ?.InternalCode;

    var actualNumber = string.IsNullOrEmpty(maxCode)
      ? Constants.MINIMUM_CODE_VALUE
      : !Regex.IsMatch(maxCode, "\\d+")
        ? Constants.MINIMUM_CODE_VALUE
        : Convert.ToInt32(Regex.Match(maxCode, "\\d+").Value);

    var proposedCode = "UO" + actualNumber.ToString().PadLeft(6, '0');

    while ((additionallyOccupiedCodes != null && additionallyOccupiedCodes.Contains(proposedCode)) ||
      await _repository
        .AsQueryable(new OrgUnitByInternalCodeSpec(proposedCode))
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .SingleOrDefaultAsync() != null)
    {
      actualNumber++;
      proposedCode = "UO" + actualNumber.ToString().PadLeft(6, '0');
    }

    return proposedCode;
  }

  public Task<string> SuggestNextCode(int? parentId, string[] additionallyOccupiedCodes) => throw new NotImplementedException();
  public Task<string> SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes) => throw new NotImplementedException();

  public string SuggestNextCode(string parentCode) => throw new NotImplementedException();
}
