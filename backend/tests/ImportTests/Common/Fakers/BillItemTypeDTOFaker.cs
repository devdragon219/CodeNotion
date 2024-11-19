using RealGimm.Infrastructure;
using RealGimm.Plugin.Import.Common.Models;

namespace RealGimm.ImportTests.Common.Fakers;

public sealed class BillItemTypeDTOFaker : BaseSeededFaker<BillItemTypeDTO>
{
  private int _generatedDtosCount = 0;

  public required IEnumerable<VATRateDTO> VATRates { get; init; }

  public BillItemTypeDTOFaker()
  {
    CustomInstantiator(faker =>
    {
      var billItemTypeDto = new BillItemTypeDTO
      {
        Description = faker.Lorem.Sentence(2),
        InternalCode = $"VB{(_generatedDtosCount + 1).ToString().PadLeft(3, '0')}",
        IsPositive = faker.Random.Bool(),
        IsForContractFee = faker.Random.Bool(),
        IsForContractCosts = faker.Random.Bool(),
        IsForAdministration = faker.Random.Bool(),
        ActiveSubjectVR = faker.PickRandom(VATRates!.Where(vatRate => vatRate.Type == "A")).InternalCode,
        ActiveExemptVR = faker.PickRandom(VATRates!.Where(vatRate => vatRate.Type == "E")).InternalCode,
        ActiveNonTaxableVR = faker.PickRandom(VATRates!.Where(vatRate => vatRate.Type is not "A" and not "E")).InternalCode,
        PassiveSubjectVR = faker.PickRandom(VATRates!.Where(vatRate => vatRate.Type == "A")).InternalCode,
        PassiveExemptVR = faker.PickRandom(VATRates!.Where(vatRate => vatRate.Type == "E")).InternalCode,
        PassiveNonTaxableVR = faker.PickRandom(VATRates!.Where(vatRate => vatRate.Type is not "A" and not "E")).InternalCode,
      };

      return billItemTypeDto;
    });

    FinishWith((_, _) => _generatedDtosCount++);
  }
}
