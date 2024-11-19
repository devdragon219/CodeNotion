using Bogus;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Common.VATRateAggregate;

namespace RealGimm.Infrastructure.Prop.Data.Fakers;

public sealed class BillItemTypeFaker : BaseSeededFaker<BillItemType>
{
  public IEnumerable<VATRate> VATRates { get; private set; } = [];

  public BillItemTypeFaker()
  {
    CustomInstantiator(faker =>
    {
      var billItemType = new BillItemType();

      billItemType.SetData(GenerateDescription(faker), true, true, true, faker.Random.Bool(), false);
      billItemType.SetInternalCode(GenerateInternalCode(faker));
      billItemType.SetVatRates(
        faker.PickRandom(VATRates),
        faker.PickRandom(VATRates),
        faker.PickRandom(VATRates),
        faker.PickRandom(VATRates),
        faker.PickRandom(VATRates),
        faker.PickRandom(VATRates),
        faker.PickRandom(VATRates)
      );

      return billItemType;
    });

    FinishWith((_, billItemType) =>
    {
      var validationErrors = billItemType.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(billItemType)} entity! Errors: {errorMessages}");
      }
    });
  }
  public BillItemTypeFaker UseVATRates(IEnumerable<VATRate> vatRates)
  {
    VATRates = vatRates ?? throw new ArgumentNullException(nameof(vatRates));

    return this;
  }

  public static string GenerateDescription(Faker faker) => faker.Lorem.Sentence(2);

  public static string GenerateInternalCode(Faker faker) => faker.Random.AlphaNumeric(5);
}
