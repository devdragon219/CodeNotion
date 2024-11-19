using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Nrgy.Data.Fakers;
using RealGimm.Web.Nrgy.Models;

namespace RealGimm.FunctionalTests.Web.Fakers.Nrgy;

public sealed class UtilityServiceInputFaker : BaseSeededFaker<UtilityServiceInput>
{
  private int _generatedInputsCount = 0;

  public required IEnumerable<(int EstateId, IEnumerable<int> EstateUnitIds)> EstateUnitsPerEstateIds { get; init; }
  public required IEnumerable<int> SubjectsIds { get; init; }
  public required IEnumerable<int> OrgUnitsIds { get; init; }
  public required IEnumerable<int> AccountingItemsIds { get; init; }
  public required IEnumerable<int> UtilityTypeIds { get; init; }

  public UtilityServiceInputFaker() : base(seed: 1)
  {
    CustomInstantiator(faker =>
    {
      var (activationDate, _, _) = UtilityServiceFaker.GenerateDateRange(faker);
      var (estatesIds, estateUnitsIds) = UtilityServiceFaker.PickRandomEstateAndEstateUnitIds(faker, EstateUnitsPerEstateIds!);

      return new UtilityServiceInput
      {
        InternalCode = UtilityServiceFaker.GenerateInternalCode(number: _generatedInputsCount + 1),
        Description = UtilityServiceFaker.GenerateWord(faker),
        Deposit = UtilityServiceFaker.GenerateDeposit(faker),
        Status = UtilityServiceFaker.PickRandomEntryStatus(faker),
        ActivationDate = activationDate,
        Notes = UtilityServiceFaker.GenerateWord(faker),
        UtilityTypeId = UtilityServiceFaker.PickRandomId(faker, UtilityTypeIds!),
        EstateIds = estatesIds!,
        EstateUnitIds = estateUnitsIds!,
        ProviderSubjectId = UtilityServiceFaker.PickRandomId(faker, SubjectsIds!),
        ReferenceSubjectId = UtilityServiceFaker.PickRandomId(faker, SubjectsIds!),
        OrgUnitId = UtilityServiceFaker.PickRandomId(faker, OrgUnitsIds!),
        AccountingItemId = UtilityServiceFaker.PickRandomId(faker, AccountingItemsIds!),
        IsFreeMarket = UtilityServiceFaker.GenerateIsFreeMarket(faker),
        UtilityUserCode = UtilityServiceFaker.GenerateCode(faker),
        UtilityContractCode = UtilityServiceFaker.GenerateCode(faker),
        UtilityMeterSerial = UtilityServiceFaker.GenerateCode(faker, 10),
        UtilityDeliveryPointCode = UtilityServiceFaker.GenerateCode(faker),
        ContractPowerMaximum = UtilityServiceFaker.GenerateCode(faker, 3),
        ContractPowerNominal = UtilityServiceFaker.GenerateCode(faker, 3),
        ContractNominalTension = UtilityServiceFaker.GenerateCode(faker, 3)
      };
    });

    FinishWith((_, _) => _generatedInputsCount++);
  }
}
