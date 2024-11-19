using Bogus;
using RealGimm.Core.Common;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;

namespace RealGimm.Infrastructure.Nrgy.Data.Fakers;

public sealed class UtilityServiceFaker : BaseSeededFaker<UtilityService>
{
  private int _generatedEntitiesCount = 0;

  public required IEnumerable<(int EstateId, IEnumerable<int> EstateUnitIds)> EstateUnitsPerEstateIds { get; init; }
  public required IEnumerable<int> SubjectsIds { get; init; }
  public required IEnumerable<int> OrgUnitsIds { get; init; }
  public required IEnumerable<int> AccountingItemsIds { get; init; }
  public required IEnumerable<UtilityType> UtilityTypes { get; init; }

  public UtilityServiceFaker()
  {
    CustomInstantiator(faker =>
    {
      var utilityService = new UtilityService();
      utilityService.SetInternalCode(GenerateInternalCode(number: _generatedEntitiesCount + 1));
      utilityService.SetDescription(GenerateWord(faker));
      utilityService.SetDeposit(GenerateDeposit(faker));
      utilityService.SetStatus(PickRandomEntryStatus(faker));
      utilityService.SetNotes(GenerateWord(faker));

      var (estatesIds, estateUnitsIds) = PickRandomEstateAndEstateUnitIds(faker, EstateUnitsPerEstateIds!);

      utilityService.UpdateUtilityDetails(
        utilityType: faker.PickRandom(UtilityTypes!),
        estateIds: estatesIds,
        estateUnitIds: estateUnitsIds,
        providerSubjectId: PickRandomId(faker, SubjectsIds!),
        referenceSubjectId: PickRandomId(faker, SubjectsIds!),
        orgUnitId: PickRandomId(faker, OrgUnitsIds!),
        accountingItemId: PickRandomId(faker, AccountingItemsIds!),
        isFreeMarket: GenerateIsFreeMarket(faker)
      );

      utilityService.UpdateContractInformation(
        utilityUserCode: GenerateCode(faker),
        utilityContractCode: GenerateCode(faker),
        utilityMeterSerial: GenerateCode(faker, 10),
        utilityDeliveryPointCode: GenerateCode(faker)
      );

      utilityService.UpdateContractPowerDetails(
        contractPowerMaximum: GenerateCode(faker, 3),
        contractPowerNominal: GenerateCode(faker, 3),
        contractNominalTension: GenerateCode(faker, 3)
      );

      var (activationDate, deactivationRequest, deactivationDate) = GenerateDateRange(faker);
      utilityService.SetActivationDate(activationDate);
      utilityService.SetDeactivationDates(deactivationRequest, deactivationDate);

      return utilityService;
    });

    FinishWith((faker, utilityService) =>
    {
      var validationErrors = utilityService.Validate().ToList();
      if (validationErrors.Count > 0)
      {
        var errorMessages = string.Join(", ", validationErrors.Select(error => error.ErrorMessage));
        throw new InvalidOperationException($"Invalid {nameof(UtilityService)} entity! Errors: {errorMessages}");
      }

      _generatedEntitiesCount++;
    });
  }

  public static (int[] EstatesIds, int[] EstateUnitsIds) PickRandomEstateAndEstateUnitIds(
    Faker faker,
    IEnumerable<(int EstateId, IEnumerable<int> EstateUnitIds)> estateUnitsPerEstateIds)
  {
    estateUnitsPerEstateIds = estateUnitsPerEstateIds.Where(pair => pair.EstateUnitIds.Any()).ToArray();

    var picked = faker.PickRandom(estateUnitsPerEstateIds, amountToPick: faker.Random.Int(1, int.Min(3, estateUnitsPerEstateIds.Count())));
    var estatesIds = picked.Select(pair => pair.EstateId).ToArray();
    
    var estateUnitsIds = picked.SelectMany(pair =>
      faker
        .PickRandom(pair.EstateUnitIds, faker.Random.Int(1, pair.EstateUnitIds.Count())))
        .ToArray();

    return (estatesIds, estateUnitsIds);
  }

  public static string GenerateInternalCode(int number)
    => $"F{number.ToString().PadLeft(5, '0')}";

  public static int PickRandomId(Faker faker, IEnumerable<int> ids) => faker.PickRandom(ids);

  public static int[] PickRandomIds(Faker faker, IEnumerable<int> ids)
    => faker.PickRandom(ids, faker.Random.Int(1, ids.Count())).ToArray();

  public static bool GenerateIsFreeMarket(Faker faker) => faker.Random.Bool();

  public static decimal GenerateDeposit(Faker faker) => decimal.Round(faker.Random.Decimal(), 2);

  public static string GenerateCode(Faker faker, int charsCount = 5) => faker.Random.AlphaNumeric(charsCount);

  public static string GenerateWord(Faker faker) => faker.Lorem.Word();

  public static EntryStatus PickRandomEntryStatus(Faker faker) => faker.PickRandom<EntryStatus>();

  public static (DateOnly Activation, DateOnly DeactivationRequest, DateOnly Deactivation) GenerateDateRange(Faker faker)
  {
    var activation = faker.Date.PastDateOnly(refDate: new DateOnly(2024, 02, 01));
    var deactivationRequest = faker.Date.BetweenDateOnly(start: new DateOnly(2024, 02, 01), end: new DateOnly(2024, 04, 01));
    var deactivation = faker.Date.FutureDateOnly(refDate: new DateOnly(2024, 04, 01));

    return (activation, deactivationRequest, deactivation);
  }
}
