using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Fclt.Services;

public class ContractTypeCodeSuggestionService : CodeSuggestorBase<ContractType>
{
  public ContractTypeCodeSuggestionService(IReadRepository<ContractType> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, ContractType? partialEntity)
    => $"TCM{unoccupiedNumber.ToString().PadLeft(3, '0')}";
}
