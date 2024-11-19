using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.SharedKernel;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.Core.Fclt.Services;

public partial class PenaltyCodeSuggestionService : ICodeSuggestor<Penalty>
{
  private readonly IReadRepository<Penalty> _repository;

  public PenaltyCodeSuggestionService(IReadRepository<Penalty> repository)
  {
    _repository = repository;
  }

  public async Task<string?> SuggestNextCode(int? parentId, Penalty? partialEntity, string[]? additionallyOccupiedCodes)
  {
    if (parentId is not null)
    {
      throw new NotSupportedException();
    }

    var occupiedCodes = (await GetOccupiedCodes()).Concat(additionallyOccupiedCodes ?? []).ToArray();

    return SuggestCode(occupiedCodes, partialEntity);
  }

  public Task<string> SuggestNextCode(int? parentId, string[] additionalOccupiedCodes)
    => SuggestNextCode(parentId, null, additionalOccupiedCodes)!;

  string ICodeSuggestor<Penalty>.SuggestNextCode(string parentCode)
    => throw new NotImplementedException();

  Task<string> ICodeSuggestor<Penalty>.SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes)
    => throw new NotImplementedException();

  private Task<string[]> GetOccupiedCodes()
    => _repository
        .AsQueryable()
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .Select(penalty => penalty.InternalCode!)
        .ToArrayAsync();

  private static string CreateCode(int number, string? contractInternalCode)
    => $"{contractInternalCode}PE{number.ToString().PadLeft(3, '0')}";

  private static string SuggestCode(string[] occupiedCodes, Penalty? penalty)
  {
    var contractInternalCode = penalty?.Contract?.InternalCode;
    var lastOccupiedNumber = GetLastOccupiedNumber(occupiedCodes, contractInternalCode);

    string suggestedCode;

    do
    {
      lastOccupiedNumber++;
      suggestedCode = CreateCode(lastOccupiedNumber, contractInternalCode);
    }
    while (occupiedCodes.Any(occupiedCode => occupiedCode == suggestedCode));

    return suggestedCode;
  }

  private static int GetLastOccupiedNumber(string[] occupiedCodes, string? contractInternalCode)
  {
    if (occupiedCodes.Length == 0)
    {
      return 0;
    }

    var regex = string.IsNullOrWhiteSpace(contractInternalCode)
      ? new Regex(@"^PE(\d+)$", RegexOptions.Compiled)
      : new Regex(@$"^{Regex.Escape(contractInternalCode)}PE(\d+)$");

    var occupiedNumbers = occupiedCodes
      .Where(code => regex.IsMatch(code))
      .Select(code => int.Parse(regex.Match(code)!.Groups[1]!.Value))
      .ToArray();

    if (occupiedNumbers.Length == 0)
    {
      return 0;
    }

    return occupiedNumbers.Max();
  }
}
