using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Prop.Services;

public class BillItemTypeCodeSuggestionService : CodeSuggestorBase<BillItemType>
{
  public BillItemTypeCodeSuggestionService(IReadRepository<BillItemType> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, BillItemType? partialEntity)
    => $"VB{unoccupiedNumber.ToString().PadLeft(3, '0')}";
}
