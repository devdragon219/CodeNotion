using Bogus;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class BillRowFaker : BaseSeededFaker<BillRow>
{
  public required IEnumerable<int> VatRateIds { get; init; }
  public required IEnumerable<BillItemType> BillItemTypes { get; init; }

  public BillRowFaker()
  {
    CustomInstantiator(faker =>
    {
      var billRow = new BillRow();
      billRow.SetVATRateId(PickRandom(VatRateIds!, faker));
      billRow.SetAmount(GenerateAmount(faker));
      billRow.SetNotes(GenerateNotes(faker));
      billRow.SetBillItemType(PickRandomBillItemType(BillItemTypes!, faker));

      return billRow;
    });

    FinishWith((_, billRow) =>
    {
      var validationErrors = billRow.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(BillRow)} entity! Errors: {errorMessages}");
      }
    });
  }

  public static int PickRandom(IEnumerable<int> vatRateIds, Faker faker)
    => faker.PickRandom(vatRateIds);

  public static BillItemType PickRandomBillItemType(IEnumerable<BillItemType> billItemTypes, Faker faker)
    => faker.PickRandom(billItemTypes);

  public static decimal GenerateAmount(Faker faker) => decimal.Round(faker.Random.Decimal(1, 200), 2);

  public static string GenerateNotes(Faker faker) => faker.Lorem.Sentence();
}
