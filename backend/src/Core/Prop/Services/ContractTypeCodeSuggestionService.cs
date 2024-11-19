using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Prop.Services;

public class ContractTypeCodeSuggestionService : CodeSuggestorBase<ContractType>
{
  public ContractTypeCodeSuggestionService(IReadRepository<ContractType> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, ContractType? partialEntity)
    => $"CT{unoccupiedNumber.ToString().PadLeft(5, '0')}";
}
