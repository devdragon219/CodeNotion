using Bogus;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Infrastructure;

namespace RealGimm.FunctionalTests.Web.Fakers.Common;

public sealed class AccountingItemFaker : BaseSeededFaker<AccountingItem>
{
  private int _generatedAccountingItemCount = 0;

  public AccountingItemFaker()
  {
    CustomInstantiator(faker =>
    {
      var accountingItem = new AccountingItem();

      accountingItem.SetDescription(GenerateDescription(faker));
      accountingItem.SetCodes(
        GenerateInternalCode(faker),
        GenerateExternalCode(faker)
      );

      return accountingItem;
    });

    FinishWith((_, accountingItem) =>
    {
      _generatedAccountingItemCount++;
    });
  }

  public static string GenerateDescription(Faker faker) => faker.Lorem.Word();
  public static string GenerateInternalCode(Faker faker) => faker.Random.AlphaNumeric(5);
  public static string GenerateExternalCode(Faker faker) => faker.Random.AlphaNumeric(9);
}
