using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Asst.Services;

public class FunctionAreaCodeSuggestionService : ICodeSuggestor<FunctionArea>
{
  private readonly IReadRepository<FunctionArea> _functionAreaRepository;

  public FunctionAreaCodeSuggestionService(IReadRepository<FunctionArea> functionAreaRepo)
  {
    _functionAreaRepository = functionAreaRepo;
  }

  public async Task<string?> SuggestNextCode(int? parentId, FunctionArea? partialEntity, string[]? additionallyOccupiedCodes)
  {
    var occupiedCodes = await GetOccupiedCodes();

    return SuggestNextCode(occupiedCodes.Concat(additionallyOccupiedCodes ?? Array.Empty<string>()));
  }

  public async Task<string> SuggestNextCode(int? parentId, string[] additionalOccupiedCodes)
  {
    ArgumentNullException.ThrowIfNull(additionalOccupiedCodes);

    return SuggestNextCode((await GetOccupiedCodes())
      .Concat(additionalOccupiedCodes));
  }

  public string SuggestNextCode(string parentCode) => throw new NotImplementedException();
  public Task<string> SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes) => throw new NotImplementedException();

  private async Task<IEnumerable<string?>> GetOccupiedCodes()
    => await _functionAreaRepository
      .AsQueryable()
      .TagWith(Constants.SKIP_ACCESS_FILTER)
      .Select(fa => fa.InternalCode)
      .ToArrayAsync();

  private static string SuggestNextCode(IEnumerable<string?> previousCodes)
  {
    var maxCode = previousCodes.DefaultIfEmpty().Max();

    var actualNumber = string.IsNullOrEmpty(maxCode)
      ? 0
      : !Regex.IsMatch(maxCode, "\\d+$")
        ? 0
        : Convert.ToInt32(Regex.Match(maxCode, "\\d+$").Value);

    var proposedCode = $"FA{actualNumber.ToString().PadLeft(3, '0')}";

    while (previousCodes.Any(code => code == proposedCode))
    {
      actualNumber++;
      proposedCode = $"FA{actualNumber.ToString().PadLeft(3, '0')}";
    }

    return proposedCode;
  }
}
