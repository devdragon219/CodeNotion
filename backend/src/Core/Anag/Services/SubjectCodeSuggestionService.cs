using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Anag.Services;

public partial class SubjectCodeSuggestionService : ICodeSuggestor<Subject>
{
  private readonly IReadRepository<Subject> _repository;
  public SubjectCodeSuggestionService(IReadRepository<Subject> repository)
  {
    _repository = repository;
  }

  public async Task<string?> SuggestNextCode(int? parentId, Subject? partialEntity, string[]? additionallyOccupiedCodes)
  {
    // Given as an hypothesys that codes are lexicographically sortable,
    // let's ask for the maximum value in the existing data.
    var maxCode = (await _repository
      .AsQueryable(new SubjectMaxInternalCodeSpec())
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .SingleOrDefaultAsync())
      ?.InternalCode;

    var actualNumber = string.IsNullOrEmpty(maxCode)
      ? Constants.MINIMUM_CODE_VALUE
      : !rgxNumber().IsMatch(maxCode)
        ? Constants.MINIMUM_CODE_VALUE
        : Convert.ToInt32(rgxNumber().Match(maxCode).Value);

    var proposedCode = "S" + actualNumber.ToString().PadLeft(7, '0');

    while ((additionallyOccupiedCodes != null && additionallyOccupiedCodes.Contains(proposedCode)) ||
      await _repository
        .AsQueryable(new GetByInternalCodeSpec<Subject>(proposedCode))
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .SingleOrDefaultAsync() != null)
    {
      actualNumber++;
      proposedCode = "S" + actualNumber.ToString().PadLeft(7, '0');
    }

    return proposedCode;
  }

  public Task<string> SuggestNextCode(int? parentId, string[] additionallyOccupiedCodes) => throw new NotImplementedException();
  public Task<string> SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes) => throw new NotImplementedException();

  public string SuggestNextCode(string parentCode) => throw new NotImplementedException();
  
  [GeneratedRegex("\\d+")]
  private static partial Regex rgxNumber();
}
