using Ardalis.Specification;
using System.Text.RegularExpressions;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Fclt.Services;

public partial class SLACodeSuggestionService : ICodeSuggestor<SLA>
{
  private readonly IReadRepository<SLA> _repository;

  public SLACodeSuggestionService(IReadRepository<SLA> repository)
  {
    _repository = repository;
  }

  public async Task<string?> SuggestNextCode(int? parentId, SLA? partialEntity, string[]? additionallyOccupiedCodes)
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

  string ICodeSuggestor<SLA>.SuggestNextCode(string parentCode)
    => throw new NotImplementedException();

  Task<string> ICodeSuggestor<SLA>.SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes)
    => throw new NotImplementedException();

  private Task<string[]> GetOccupiedCodes()
    => _repository
        .AsQueryable()
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .Select(sla => sla.InternalCode!)
        .ToArrayAsync();

  private static string CreateCode(int number, string? contractInternalCode)
    => $"{contractInternalCode}SLA{number.ToString().PadLeft(3, '0')}";

  private static string SuggestCode(string[] occupiedCodes, SLA? sla)
  {
    var contractInternalCode = sla?.Contract?.InternalCode;
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
      ? new Regex(@"^SLA(\d+)$", RegexOptions.Compiled)
      : new Regex(@$"^{Regex.Escape(contractInternalCode)}SLA(\d+)$");

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
