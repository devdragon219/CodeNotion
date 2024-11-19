using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public class ContractTemplateCodeSuggestionService : CodeSuggestorBase<ContractTemplate>
{
  public ContractTemplateCodeSuggestionService(IReadRepository<ContractTemplate> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, ContractTemplate? partialEntity)
    => $"MCM{unoccupiedNumber.ToString().PadLeft(3, '0')}";
}
