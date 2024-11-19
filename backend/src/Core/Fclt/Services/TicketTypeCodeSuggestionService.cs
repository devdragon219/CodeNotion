using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public class TicketTypeCodeSuggestionService : CodeSuggestorBase<TicketType>
{
  public TicketTypeCodeSuggestionService(IReadRepository<TicketType> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, TicketType? partialEntity)
    => $"TTK{unoccupiedNumber.ToString().PadLeft(2, '0')}";
}
