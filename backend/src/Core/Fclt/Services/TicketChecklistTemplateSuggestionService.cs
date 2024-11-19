using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public class TicketChecklistTemplateCodeSuggestionService : CodeSuggestorBase<TicketChecklistTemplate>
{
  public TicketChecklistTemplateCodeSuggestionService(IReadRepository<TicketChecklistTemplate> repository)
    : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, TicketChecklistTemplate? partialEntity)
    => $"SM{unoccupiedNumber.ToString().PadLeft(2, '0')}";
}
