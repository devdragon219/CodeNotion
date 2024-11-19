using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Prop.Services;

public class ContractCodeSuggestionService : CodeSuggestorBase<Contract>
{
  public ContractCodeSuggestionService(IReadRepository<Contract> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, Contract? partialEntity)
  {
    ArgumentNullException.ThrowIfNull(partialEntity, nameof(partialEntity));
    
    var prefix = partialEntity.Type.IsActive ? "CA" : "CP";
    
    return $"{prefix}{unoccupiedNumber.ToString().PadLeft(5, '0')}";
  }
}
