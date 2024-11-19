using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Web.Common.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Common;

public sealed class BillItemTypeInputFaker : BaseSeededFaker<BillItemTypeInput>
{
  public ICollection<VATRate> VATRates { get; private set; } = Array.Empty<VATRate>();
  public BillItemTypeInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var billItemType = new BillItemTypeInput()
      {
        Description = BillItemTypeFaker.GenerateDescription(faker),
        InternalCode = BillItemTypeFaker.GenerateInternalCode(faker),
        IsForAdministration = true,
        IsForContractFee = true,
        IsForContractCosts = true,
        IsPositive = faker.Random.Bool(),
        ActiveExemptVRId = faker.PickRandom(VATRates).Id,
        ActiveNonTaxableVRId = faker.PickRandom(VATRates).Id,
        ActiveSubjectVRId = faker.PickRandom(VATRates).Id,
        PassiveExemptVRId = faker.PickRandom(VATRates).Id,
        PassiveNonTaxableVRId = faker.PickRandom(VATRates).Id,
        PassiveSubjectVRId = faker.PickRandom(VATRates).Id,
        AdministrationVRId = faker.PickRandom(VATRates).Id,
      };

      return billItemType;
    });
  }

  public BillItemTypeInputFaker UseVATRates(ICollection<VATRate> vatRates)
  {
    VATRates = vatRates ?? throw new ArgumentNullException(nameof(vatRates));

    return this;
  }
}
