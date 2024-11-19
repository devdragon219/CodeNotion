using Bogus;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class RecurringAdditionFaker : BaseSeededFaker<RecurringAddition>
{
  public IEnumerable<BillItemType> BillItemTypes { get; private set; } = [];
  public IEnumerable<int> AccountingItemsIds { get; private set; } = [];
  public IEnumerable<int> VATRatesIds { get; private set; } = [];

  public RecurringAdditionFaker()
  {
    CustomInstantiator(faker =>
    {
      var reccuringAddition = new RecurringAddition();
      reccuringAddition.SetBillItemType(PickBillItemType(faker, BillItemTypes));
      reccuringAddition.SetAccountingItemId(PickAccountingItemId(faker, AccountingItemsIds));
      reccuringAddition.SetVATRateId(PickVATRateId(faker, VATRatesIds));
      reccuringAddition.SetAmountPerInstallment(GenerateAmountPerInstallment(faker));
      reccuringAddition.SetExcludeStartMonth(GenerateExcludeStartMonth(faker));
      reccuringAddition.SetExcludeEndMonth(GenerateExcludeEndMonth(faker));
      reccuringAddition.SetNotes(GenerateNotes(faker));

      return reccuringAddition;
    });
  }

  public static BillItemType PickBillItemType(Faker faker, IEnumerable<BillItemType> billItemTypes)
    => faker.PickRandom(billItemTypes);

  public static int PickAccountingItemId(Faker faker, IEnumerable<int> accountingItemsIds)
    => faker.PickRandom(accountingItemsIds);

  public static int PickVATRateId(Faker faker, IEnumerable<int> vatRatesIds)
    => faker.PickRandom(vatRatesIds);

  public static decimal GenerateAmountPerInstallment(Faker faker)
    => decimal.Round(faker.Random.Decimal(100m, 1000m), 2);

  public static int? GenerateExcludeStartMonth(Faker faker)
    => faker.Random.Bool()
      ? faker.Random.Int(1, 12)
      : null;

  public static int? GenerateExcludeEndMonth(Faker faker)
    => faker.Random.Bool()
        ? faker.Random.Int(1, 12)
        : null;

  public static string? GenerateNotes(Faker faker)
    => faker.Random.Bool()
      ? faker.Lorem.Sentence(10, 3)
      : null;

  public RecurringAdditionFaker UseBillItemTypes(IEnumerable<BillItemType> billItemTypes)
  {
    BillItemTypes = billItemTypes ?? throw new ArgumentNullException(nameof(billItemTypes));

    return this;
  }

  public RecurringAdditionFaker UseAccountingItemsIds(IEnumerable<int> accountingItemsIds)
  {
    AccountingItemsIds = accountingItemsIds ?? throw new ArgumentNullException(nameof(accountingItemsIds));

    return this;
  }

  public RecurringAdditionFaker UseVATRatesIds(IEnumerable<int> vatRatesIds)
  {
    VATRatesIds = vatRatesIds ?? throw new ArgumentNullException(nameof(vatRatesIds));

    return this;
  }
}
