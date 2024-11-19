using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Shared.Services;

namespace RealGimm.Core.Common.Services;

public class AccountingItemCodeSuggestionService : CodeSuggestorBase<AccountingItem>
{
  public AccountingItemCodeSuggestionService(IReadRepository<AccountingItem> repository) : base(repository)
  {
  }

  protected override string CreateCode(int unoccupiedNumber, AccountingItem? partialEntity)
    => $"AI{unoccupiedNumber.ToString().PadLeft(3, '0')}";
}
