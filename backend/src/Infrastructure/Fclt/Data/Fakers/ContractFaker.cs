using Bogus;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Common;
using RealGimm.Core.Extensions;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Core.Fclt.EstateUnitGroupAggregate;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Core.Shared;

namespace RealGimm.Infrastructure.Fclt.Data.Fakers;

public sealed class ContractFaker : BaseSeededFaker<Contract>
{
  private int _generatedObjectsCount = 0;

  public required IEnumerable<ContractType> ContractTypes { get; init; }
  public required IEnumerable<ContractTemplate> ContractTemplates { get; init; }
  public required IEnumerable<Subject> ProviderSubjects { get; init; }
  public required IEnumerable<EstateUnit> EstateUnits { get; init; }
  public required IEnumerable<EstateUnitGroup> EstateUnitGroups { get; init; }
  public required IEnumerable<PriceList> PriceLists { get; init; }
  public required IEnumerable<CatalogueType> CatalogueTypes { get; init; }
  public required IEnumerable<TicketChecklistTemplate> TicketChecklistTemplates { get; init; }
  public required Func<string, SLAFaker> SLAFakerFactory { get; init; }
  public required Func<string, PenaltyFaker> PenaltyFakerFactory { get; init; }

  public ContractFaker()
  {
    CustomInstantiator(faker =>
    {
      var contract = new Contract();

      var internalCode = $"CM{(_generatedObjectsCount + 1).ToString().PadLeft(5, '0')}";
      contract.SetInternalCode(internalCode);

      contract.SetExternalCode(faker.Random.String2(8).ToUpper());
      contract.SetDescription(faker.Lorem.Sentence());
      contract.SetType(faker.PickRandom(ContractTypes));
      contract.SetOriginalTemplate(faker.PickRandom(ContractTemplates).OrNull(faker));
      contract.SetEntryStatus(faker.PickRandomWithout(EntryStatus.FrozenClosed));
      contract.SetProviderSubjectId(faker.PickRandom(ProviderSubjects).Id);

      var effectiveDate = faker.Date.BetweenDateOnly(new DateOnly(2020, 01, 01), new DateOnly(2024, 01, 01));
      contract.SetAgreementDate(effectiveDate.AddDays(faker.Random.Int(-30, -10)).OrNull(faker));
      contract.SetEffectiveDate(effectiveDate);
      contract.SetExpirationDate(effectiveDate.AddMonths(faker.Random.Int(3, 12)));
      contract.SetCancellationNoticeDaysCount(faker.PickRandom(30, 60));
      contract.SetRenewalNoticeDaysCount(faker.PickRandom(30, 60));
      contract.SetMaximumRenewalDaysCount(faker.PickRandom(90, 120));

      var frameworkAgreementsCount = faker.PickRandom(1, 3);
      for (var i = 0; i < frameworkAgreementsCount; i++)
      {
        var frameworkAgreement = new FrameworkAgreement();
        frameworkAgreement.SetExternalCode(faker.Random.String2(8).ToUpper());
        frameworkAgreement.SetNotes(faker.Lorem.Sentence().OrNull(faker));
        
        contract.FrameworkAgreements.Add(frameworkAgreement);
      }

      contract.SetOriginalEstateUnitGroup(faker.PickRandom(EstateUnitGroups).OrNull(faker));

      var estateUnits = faker
        .PickRandom(EstateUnits, amountToPick: faker.Random.Int(1, int.Min(EstateUnits!.Count(), 3)))
        .ToArray();

      contract.SetEstateUnitIds(estateUnits.Select(estateUnit => estateUnit.Id).ToArray());

      var catalogueTypes = faker
        .PickRandom(CatalogueTypes, amountToPick: faker.Random.Int(1, int.Min(CatalogueTypes!.Count(), 3)))
        .ToArray();

      contract.SetCatalogueTypeIds(catalogueTypes.Select(catalogueType => catalogueType.Id).ToArray());

      var slaFaker = SLAFakerFactory!(internalCode).UseSeed(faker.Random.Int());
      contract.SLAs.AddRange(slaFaker.GenerateBetween(1, 3));

      var penaltyFaker = PenaltyFakerFactory!(internalCode).UseSeed(faker.Random.Int());
      contract.Penalties.AddRange(penaltyFaker.GenerateBetween(1, 3));
      
      var billingInfo = new BillingInfo();
      billingInfo.SetBillingPeriod(faker.PickRandom<BillingPeriod>());
      billingInfo.SetVATPercentage(faker.Random.Decimal(5, 15).Round2().OrNull(faker));
      billingInfo.SetPurchaseFeeWithoutVAT(faker.Random.Decimal(500, 1000).Round2().OrNull(faker));
      billingInfo.SetFixedRateFee(faker.Random.Decimal(10, 30).Round2().OrNull(faker));
      billingInfo.SetDiscountPercentage(faker.Random.Decimal(1, 5).Round2().OrNull(faker));

      contract.SetBillingInfo(billingInfo);

      contract.PriceLists.AddRange(
        faker.PickRandom(PriceLists, amountToPick: faker.PickRandom(1, int.Min(3, PriceLists!.Count()))));

      var termExtensionsCount = faker.PickRandom(1, 3);
      for (int i = 0; i < termExtensionsCount; i++)
      {
        var termExtension = new TermExtension();
        termExtension.SetDaysCount(faker.PickRandom(60, 90, 120, 150, 180));
        termExtension.SetFeeDifference(faker.Random.Int(10, 20));
        termExtension.SetNotes(faker.Lorem.Sentence().OrNull(faker));

        contract.TermExtensions.Add(termExtension);
      }

      return contract;
    });

    FinishWith((faker, contractTemplate) =>
    {
      EnsureValid(contractTemplate);
      _generatedObjectsCount++;
    });
  }
}
