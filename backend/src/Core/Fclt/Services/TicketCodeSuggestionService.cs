using RealGimm.Core.Fclt.TicketAggregate;
using System.Text.RegularExpressions;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Fclt.Services;

public class TicketCodeSuggestionService : ICodeSuggestor<Ticket>
{
  private readonly IReadRepository<Ticket> _repository;

  public TicketCodeSuggestionService(IReadRepository<Ticket> repository)
  {
    _repository = repository;
  }

  public async Task<string?> SuggestNextCode(int? parentId, Ticket? partialEntity, string[]? additionallyOccupiedCodes)
  {
    ArgumentNullException.ThrowIfNull(partialEntity);

    if (parentId is not null)
    {
      throw new NotSupportedException();
    }

    var occupiedCodes = (await GetOccupiedCodes()).Concat(additionallyOccupiedCodes ?? []).ToArray();
    var type = partialEntity.MainType;
    var checklistInternalCode = partialEntity.Checklist?.InternalCode;

    return SuggestCode(occupiedCodes, type, checklistInternalCode);
  }

  public Task<string> SuggestNextCode(int? parentId, string[] additionalOccupiedCodes)
    => SuggestNextCode(parentId, null, additionalOccupiedCodes)!;

  string ICodeSuggestor<Ticket>.SuggestNextCode(string parentCode)
    => throw new NotImplementedException();

  Task<string> ICodeSuggestor<Ticket>.SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes)
    => throw new NotImplementedException();

  private Task<string[]> GetOccupiedCodes()
    => _repository
        .AsQueryable()
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .Select(ticket => ticket.InternalCode!)
        .ToArrayAsync();

  private static string CreateCode(int number, TicketMainType type, string? checklistInternalCode)
    => type switch
    {
      TicketMainType.Issue or TicketMainType.IssueParent => $"TK{number.ToString().PadLeft(5, '0')}",
      
      TicketMainType.ChecklistPreventative or TicketMainType.ChecklistOnTriggerCondition
        => $"{checklistInternalCode}/{number.ToString().PadLeft(3, '0')}",

      _ => throw new NotSupportedException()
    };

  private static string SuggestCode(string[] occupiedCodes, TicketMainType type, string? checklistInternalCode)
  {
    var lastOccupiedNumber = GetLastOccupiedNumber(occupiedCodes, type, checklistInternalCode);

    string suggestedCode;

    do
    {
      lastOccupiedNumber++;
      suggestedCode = CreateCode(lastOccupiedNumber, type, checklistInternalCode);
    }
    while (occupiedCodes.Any(occupiedCode => occupiedCode == suggestedCode));

    return suggestedCode;
  }

  private static int GetLastOccupiedNumber(string[] occupiedCodes, TicketMainType type, string? checklistInternalCode)
  {
    if (occupiedCodes.Length == 0)
    {
      return 0;
    }

    var regex = type is TicketMainType.Issue or TicketMainType.IssueParent
      ? new Regex(@"^TK(\d+)$", RegexOptions.Compiled)
      : new Regex(@$"^{Regex.Escape(checklistInternalCode!)}/(\d+)$");

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
