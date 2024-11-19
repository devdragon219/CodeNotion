using Bogus;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Prop.ContractAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class OneshotAdditionFaker : BaseSeededFaker<OneshotAddition>
{
  public IEnumerable<BillItemType> BillItemTypes { get; private set; } = [];
  public IEnumerable<int> AccountingItemsIds { get; private set; } = [];
  public IEnumerable<int> VATRatesIds { get; private set; } = [];

  public OneshotAdditionFaker()
  {
    CustomInstantiator(faker =>
    {
      var oneshotAddition = new OneshotAddition();
      oneshotAddition.SetBillItemType(PickBillItemType(faker, BillItemTypes));
      oneshotAddition.SetStartDate(GenerateStartDate(faker));
      oneshotAddition.SetAccountingItemId(PickAccountingItemId(faker, AccountingItemsIds));
      oneshotAddition.SetVATRateId(PickVATRateId(faker, VATRatesIds));
      oneshotAddition.SetIsRentalRateVariation(GenerateIsRentalRateVariation(faker));
      oneshotAddition.SetAmount(GenerateAmount(faker));
      oneshotAddition.SetInstallments(GenerateInstallments(faker));
      oneshotAddition.SetIsBoundToTermDay(GenerateIsBoundToTermDay(faker));

      var (termStartDate, termEndDate) = GenerateTermPeriod(faker);
      oneshotAddition.SetTermStartDate(termStartDate);
      oneshotAddition.SetTermEndDate(termEndDate);
      
      oneshotAddition.SetNotes(GenerateNotes(faker));

      return oneshotAddition;
    });
  }

  public static BillItemType PickBillItemType(Faker faker, IEnumerable<BillItemType> billItemTypes)
    => faker.PickRandom(billItemTypes);

  public static DateOnly GenerateStartDate(Faker faker) => faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01));

  public static int PickAccountingItemId(Faker faker, IEnumerable<int> accountingItemsIds)
    => faker.PickRandom(accountingItemsIds);

  public static int PickVATRateId(Faker faker, IEnumerable<int> vatRatesIds)
    => faker.PickRandom(vatRatesIds);

  public static bool GenerateIsRentalRateVariation(Faker faker) => faker.Random.Bool();

  public static decimal GenerateAmount(Faker faker) => decimal.Round(faker.Random.Decimal(100m, 1000m), 2);

  public static int GenerateInstallments(Faker faker) => faker.Random.Int(0, 12);

  public static bool GenerateIsBoundToTermDay(Faker faker) => faker.Random.Bool();

  public static (DateOnly? StartDate, DateOnly? EndDate) GenerateTermPeriod(Faker faker)
  {
    if (faker.Random.Bool())
    {
      return (null, null);
    }

    var startDate = faker.Date.PastDateOnly(refDate: new DateOnly(2024, 01, 01));

    var endDate = faker.Random.Bool()
      ? faker.Date.FutureDateOnly(refDate: startDate)
      : (DateOnly?)null;

    return (startDate, endDate);
  }

  public static string? GenerateNotes(Faker faker)
    => faker.Random.Bool()
      ? faker.Lorem.Sentence(10, 3)
      : null;

  public OneshotAdditionFaker UseBillItemTypes(IEnumerable<BillItemType> billItemTypes)
  {
    BillItemTypes = billItemTypes ?? throw new ArgumentNullException(nameof(billItemTypes));

    return this;
  }

  public OneshotAdditionFaker UseAccountingItemsIds(IEnumerable<int> accountingItemsIds)
  {
    AccountingItemsIds = accountingItemsIds ?? throw new ArgumentNullException(nameof(accountingItemsIds));

    return this;
  }

  public OneshotAdditionFaker UseVATRatesIds(IEnumerable<int> vatRatesIds)
  {
    VATRatesIds = vatRatesIds ?? throw new ArgumentNullException(nameof(vatRatesIds));

    return this;
  }
}
