using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.Web.Common.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Common;

public sealed class AccountingItemInputFaker : BaseSeededFaker<AccountingItemInput>
{
  public AccountingItemInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var accountingItem = new AccountingItemInput()
      {
        Description = AccountingItemFaker.GenerateDescription(faker),
        ExternalCode = AccountingItemFaker.GenerateExternalCode(faker),
        InternalCode = AccountingItemFaker.GenerateInternalCode(faker),
      };

      return accountingItem;
    });
  }
}
