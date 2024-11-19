using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Core;
using RealGimm.FunctionalTests.Web.Fakers.Prop.Contract;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.FunctionalTests.Web.Fakers.Anag;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Common;
using RealGimm.Core.Asst.EstateSubUnitAggregate;

namespace RealGimm.FunctionalTests.Web.Tests.Prop.ContractTests;

public static class ContractTestsHelper
{
  public static async Task<SeededEntities> SeedEntities(IServiceProvider services)
  {
    var managementSubjects = await services
      .GetRequiredService<IRepository<Subject>>()
      .AddRangeAsync(new ManagementSubjectFaker() { AddressFaker = new AddressFaker() }.Generate(3));

    var usageTypes = new EstateUsageTypeFaker().Generate(2);
    var usageTypeRepo = services.GetRequiredService<IRepository<EstateUsageType>>();

    await usageTypeRepo.AddRangeAsync(usageTypes);

    var contractTypes = new ContractTypeFaker()
    {
      UsageTypes = await usageTypeRepo.AsQueryable().ToListAsync()
    }.Generate(2);
    contractTypes[0].SetIsActive(true);
    contractTypes[1].SetIsActive(false);

    await services.GetRequiredService<IRepository<ContractType>>()
      .AddRangeAsync(contractTypes);

    var registrationOffices = new RegistrationOfficeFaker().Generate(2);

    await services.GetRequiredService<IRepository<RegistrationOffice>>()
      .AddRangeAsync(registrationOffices);

    var mainUsageTypes = new EstateMainUsageTypeFaker().Generate(2);

    await services.GetRequiredService<IRepository<EstateMainUsageType>>()
      .AddRangeAsync(mainUsageTypes);

    var cities = await services
      .GetRequiredService<IRepository<City>>()
      .AddRangeAsync(new City[] { new("City", Guid.NewGuid(), CountryISO3.ITA, Guid.NewGuid()) });

    var estateUnitFaker = new Fakers.Asst.EstateUnitFaker
    {
      Estates = new Fakers.Asst.EstateFaker
      {
        ManagementSubjectId = managementSubjects.First().Id,
        MainUsageTypes = mainUsageTypes,
        UsageTypes = usageTypes
      }.Generate(1)
    };

    var estateUnit = estateUnitFaker.Generate();

    var estateSubUnitFaker = new EstateSubUnitFaker
    {
      EstatesUnits = new[] { estateUnit },
      UsageTypes = usageTypes
    };

    estateUnit.AddSubUnit(estateSubUnitFaker.Generate());

    await services
      .GetRequiredService<IRepository<EstateUnit>>()
      .AddAsync(estateUnit);

    var accountingItems = await services
      .GetRequiredService<IRepository<AccountingItem>>()
      .AddRangeAsync(new AccountingItemFaker().Generate(2));

    var vatRates = await services
      .GetRequiredService<IRepository<VATRate>>()
      .AddRangeAsync(new VATRateFaker().Generate(2));

    var billItemTypes = await services
      .GetRequiredService<IRepository<BillItemType>>()
      .AddRangeAsync(new BillItemTypeFaker()
        .UseVATRates(vatRates)
        .Generate(2));

    return new SeededEntities(
      managementSubjects.Select(x => x.Id),
      contractTypes,
      registrationOffices,
      managementSubjects.Select(x => x.Id),
      cities.Select(x => x.Id),
      [(estateUnit.Id, estateUnit.ManagementSubjectId, estateUnit.EstateSubUnits.Select(unit => unit.Id))],
      billItemTypes,
      accountingItems.Select(x => x.Id),
      vatRates.Select(x => x.Id),
      managementSubjects.ToDictionary(
        subject => subject.Id,
        subject => subject.Addresses
          .Where(address => address.AddressType != AddressType.BirthLocation)
          .Select(x => x.Id)),
      managementSubjects.ToDictionary(subject => subject.Id, subject => subject.BankAccounts.Select(x => x.Id)));
  }

  public static ContractFaker CreateContractFaker(SeededEntities seededEntities)
    => new ContractFaker()
        {
          BillItemTypes = seededEntities.BillItemTypes,
          LocatedUnitFakerFactory = (managementSubjectId, isActiveContract) => new LocatedUnitFaker
          {
            EstateSubUnitsByUnitsIds = seededEntities.EstateUnits
              .Where(esateUnit => esateUnit.ManagementSubjectId == managementSubjectId)
              .ToDictionary(estateUnit => estateUnit.Id, estateUnit => estateUnit.SubUnitsIds),
            IsActiveContract = isActiveContract
          }
        }
        .UseManagementSubjectsIds([seededEntities.ManagementSubjectsIds.First()])
        .UseContractTypes(seededEntities.ContractTypes)
        .UseRevolutionFaker(new RevaluationFaker())
        .UseRatePlanFaker(new RatePlanFaker())
        .UseBillingPauseFaker(new BillingPauseFaker())
        .UseTransactorFaker(new TransactorFaker() { SubjectsWithAddresses = seededEntities.SubjectsWithAddresses })
        .UseSecurityDepositFaker(new SecurityDepositFaker() { SubjectsWithBankAccounts = seededEntities.SubjectsWithBankAccounts })
        .UseRegistrationTaxFaker(new RegistrationTaxFaker()
          {
            RegistrationOffices = seededEntities.RegistrationOffices
          }
          .UseCitiesIds(seededEntities.CitiesIds)
          .UseSubjectsIds(seededEntities.SubjectsIds))

        .UseCounterpartFaker(new CounterpartFaker()
          .UseSubjectsIds(seededEntities.SubjectsIds))

        .UseTakeoverFaker(new TakeoverFaker()
          .UseSubjectsIds(seededEntities.SubjectsIds))

        .UseOneshotAdditionFaker(new OneshotAdditionFaker()
          .UseBillItemTypes(seededEntities.BillItemTypes)
          .UseAccountingItemsIds(seededEntities.AccountingItemsIds)
          .UseVATRatesIds(seededEntities.VatRatesIds))

        .UseRecurringAdditionFaker(new RecurringAdditionFaker()
          .UseBillItemTypes(seededEntities.BillItemTypes)
          .UseAccountingItemsIds(seededEntities.AccountingItemsIds)
          .UseVATRatesIds(seededEntities.VatRatesIds));

  public static ContractInputFaker CreateContractInputFaker(SeededEntities seededEntities)
    => new ContractInputFaker()
        {
          BillItemTypes = seededEntities.BillItemTypes,
          LocatedUnitInputFakerFactory = (managementSubjectId, isActiveContract) => new LocatedUnitInputFaker
          {
            EstateSubUnitsByUnitsIds = seededEntities.EstateUnits
              .Where(esateUnit => esateUnit.ManagementSubjectId == managementSubjectId)
              .ToDictionary(estateUnit => estateUnit.Id, estateUnit => estateUnit.SubUnitsIds),
            IsActiveContract = isActiveContract
          }
        }
        .UseManagementSubjectsIds([seededEntities.ManagementSubjectsIds.First()])
        .UseContractTypes(seededEntities.ContractTypes)
        .UseRevolutionInputFaker(new RevaluationInputFaker())
        .UseRatePlanInputFaker(new RatePlanInputFaker())        
        .UseTransactorInputFaker(new TransactorInputFaker() { SubjectsWithAddresses = seededEntities.SubjectsWithAddresses })
        .UseSecurityDepositInputFaker(new SecurityDepositInputFaker() { SubjectsWithBankAccounts = seededEntities.SubjectsWithBankAccounts })

        .UseRegistrationTaxInputFaker(new RegistrationTaxInputFaker()
          .UseCitiesIds(seededEntities.CitiesIds)
          .UseSubjectsIds(seededEntities.SubjectsIds)
          .UseRegistrationOffices(seededEntities.RegistrationOffices))

        .UseCounterpartInputFaker(new CounterpartInputFaker()
          .UseSubjectsIds(seededEntities.SubjectsIds))

        .UseOneshotAdditionInputFaker(new OneshotAdditionInputFaker()
          .UseBillItemTypes(seededEntities.BillItemTypes)
          .UseAccountingItemsIds(seededEntities.AccountingItemsIds)
          .UseVATRatesIds(seededEntities.VatRatesIds))

        .UseRecurringAdditionInputFaker(new RecurringAdditionInputFaker()
          .UseBillItemTypes(seededEntities.BillItemTypes)
          .UseAccountingItemsIds(seededEntities.AccountingItemsIds)
          .UseVATRatesIds(seededEntities.VatRatesIds));

  public sealed record SeededEntities(
    IEnumerable<int> ManagementSubjectsIds,
    IEnumerable<ContractType> ContractTypes,
    IEnumerable<RegistrationOffice> RegistrationOffices,
    IEnumerable<int> SubjectsIds,
    IEnumerable<int> CitiesIds,
    IEnumerable<(int Id, int ManagementSubjectId, IEnumerable<int> SubUnitsIds)> EstateUnits,
    IEnumerable<BillItemType> BillItemTypes,
    IEnumerable<int> AccountingItemsIds,
    IEnumerable<int> VatRatesIds,
    IDictionary<int, IEnumerable<int>> SubjectsWithAddresses,
    IDictionary<int, IEnumerable<int>> SubjectsWithBankAccounts);
}
