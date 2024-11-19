using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public class ContractCodeSuggestionService : CodeSuggestorBase<Contract>
{
  public ContractCodeSuggestionService(IReadRepository<Contract> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, Contract? partialEntity)
    => $"CM{unoccupiedNumber.ToString().PadLeft(5, '0')}";
}
