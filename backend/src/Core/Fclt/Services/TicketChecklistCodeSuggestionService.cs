using RealGimm.Core.Fclt.PenaltyAggregate;
using System.Text.RegularExpressions;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Core.Shared.Services;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Fclt.ContractAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel;

namespace RealGimm.Core.Fclt.Services;

public class TicketChecklistCodeSuggestionService : ICodeSuggestor<TicketChecklist>
{
  private readonly IReadRepository<TicketChecklist> _ticketCheklistRepository;
  private readonly IReadRepository<Contract> _contractRepository;

  public TicketChecklistCodeSuggestionService(
    IReadRepository<TicketChecklist> ticketCheklistRepository,
    IReadRepository<Contract> contractRepository)
  {
    _ticketCheklistRepository = ticketCheklistRepository;
    _contractRepository = contractRepository;
  }

  public async Task<string?> SuggestNextCode(
    int? parentId,
    TicketChecklist? partialEntity,
    string[]? additionallyOccupiedCodes)
  {
    string contractInternalCode;

    if (!string.IsNullOrWhiteSpace(partialEntity?.Contract?.InternalCode))
    {
      contractInternalCode = partialEntity!.Contract!.InternalCode!;
    }
    else if (parentId is not null)
    {
      var contract = await _contractRepository
        .AsQueryable(new GetByIdSpec<Contract>(parentId.Value))
        .SingleAsync();

      contractInternalCode = contract.InternalCode;
    }
    else
    {
      throw new NotSupportedException();
    }

    var occupiedCodes = (await GetOccupiedCodes()).Concat(additionallyOccupiedCodes ?? []).ToArray();

    return SuggestCode(occupiedCodes, contractInternalCode);
  }

  public Task<string> SuggestNextCode(int? parentId, string[] additionalOccupiedCodes)
    => SuggestNextCode(parentId, null, additionalOccupiedCodes)!;

  string ICodeSuggestor<TicketChecklist>.SuggestNextCode(string parentCode)
    => throw new NotImplementedException();

  Task<string> ICodeSuggestor<TicketChecklist>.SuggestNextCode(string parentCode, string[] additionallyOccupiedCodes)
    => throw new NotImplementedException();

  private Task<string[]> GetOccupiedCodes()
    => _ticketCheklistRepository
        .AsQueryable()
        .TagWith(Constants.SKIP_ACCESS_FILTER)
        .Select(checklist => checklist.InternalCode!)
        .ToArrayAsync();

  private static string CreateCode(int number, string? contractInternalCode)
    => $"{contractInternalCode}SM{number.ToString().PadLeft(2, '0')}";

  private static string SuggestCode(string[] occupiedCodes, string contractInternalCode)
  {
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

  private static int GetLastOccupiedNumber(string[] occupiedCodes, string contractInternalCode)
  {
    if (occupiedCodes.Length == 0)
    {
      return 0;
    }

    var regex = new Regex(@$"^{Regex.Escape(contractInternalCode)}SM(\d+)$");

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
