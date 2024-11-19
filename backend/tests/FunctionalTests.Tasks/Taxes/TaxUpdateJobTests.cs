using System.Globalization;
using FunctionalTests.Tasks;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging.Abstractions;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.CadastralCategoryAggregate;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.Core.Asst;
using RealGimm.Core;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Common.TaxConfigAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Taxes.ItaIMU;
using RealGimm.Core.Taxes;
using RealGimm.Core.Taxes.Tasks;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using Microsoft.Extensions.DependencyInjection;
using EstateFaker = RealGimm.FunctionalTests.Web.Fakers.Asst.EstateFaker;
using EstateUnitFaker = RealGimm.FunctionalTests.Web.Fakers.Asst.EstateUnitFaker;
using RealGimm.Core.Common.CityAggregate;
using Address = RealGimm.Core.Asst.EstateAggregate.Address;
using RealGimm.Core.Asst.CadastralUnitAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.FunctionalTests.Tasks.Taxes;

[Collection(nameof(EmptyDbCollection))]
public sealed class TaxUpdateJobTests : JobTest<TaxUpdateJob>
{
  public TaxUpdateJobTests(EmptyDbHostProvider hostProvider) : base(hostProvider)
  {
  }

  [Fact]
  public async Task Should_UpdateCadstralUnitsTaxPayments()
  {
    // Arrange
    int cadastralUnitId;

    await using (var scope = Services.CreateAsyncScope())
    {
      var city = await SeedCityAsync(scope.ServiceProvider);
      var estateUnit = await SeedEstateUnitAsync(scope.ServiceProvider);
      var cadastralUnit = await SeedCadastralUnitAsync(scope.ServiceProvider, estateUnit, city, CreateCadastralUnitTaxConfigs());
      cadastralUnitId = cadastralUnit.Id;
    }

    // Act
    await ExecuteJobAsync();

    // Assert
    await using (var scope = Services.CreateAsyncScope())
    {
      var cadastralUnit = await scope.ServiceProvider
        .GetRequiredService<IRepository<CadastralUnit>>()
        .AsQueryable(new GetByIdSpec<CadastralUnit>(cadastralUnitId), new CadastralUnitIncludeAllSpec())
        .SingleAsync();

      await Verify(cadastralUnit.TaxPayments);
    }
  }

  private IEnumerable<CadastralUnitTaxConfig> CreateCadastralUnitTaxConfigs()
  {
    var imuEnabledConfig = new CadastralUnitTaxConfig();
    imuEnabledConfig.SetValue("true");

    imuEnabledConfig.SetReference(
      "ita-enabled",
      ItaIMU.CalculatorGuid,
      isMandatory: true,
      new Guid("461cba5e-f200-462d-8e3a-35d1f1b87068"),
      CustomFieldType.SingleItemFromList);

    yield return imuEnabledConfig;
  }

  private Task<CadastralUnit> SeedCadastralUnitAsync(
    IServiceProvider services,
    EstateUnit estateUnit,
    City city,
    IEnumerable<CadastralUnitTaxConfig> taxConfigs)
  {
    var cadastralUnit = new CadastralUnit();
    cadastralUnit.SetEstateUnit(estateUnit);
    cadastralUnit.SetAddress(CreateAddress(city));
    cadastralUnit.SetInternalCode("UC000001");
    cadastralUnit.SetStatus(CadastralUnitStatus.Existing);
    cadastralUnit.SetDates(new DateOnly(2020, 01, 01), null);
    cadastralUnit.SetType(EstateUnitType.Building);
    cadastralUnit.SetIncome(new CadastralUnitIncome());
    cadastralUnit.TaxConfig.AddRange(taxConfigs);

    return services.GetRequiredService<IRepository<CadastralUnit>>().AddAsync(cadastralUnit);
  }

  private Address CreateAddress(City city)
  {
    var address = new Address();
    address.SetCity("City", city.Guid);
    address.SetToponymy("Toponymy");
    address.SetNumbering("Numbering");
    address.SetLocalPostCode("LocalPostcode");
    address.SetCountry(CountryISO3.ITA, "Italy");

    return address;
  }

  private Task<TaxConfig> SeedCityRateAsync(IServiceProvider services, string code, int year, decimal rate, Guid cityReference)
  {
    var cityRateConfig = new TaxConfigSubValue();
    cityRateConfig.SetReferenceData(code, string.Empty, TaxConfigurationBase.SUBTBL_RATES);
    cityRateConfig.SetValues(SubValueType.Number, null, null, rate, null);

    var taxConfig = new TaxConfig();
    taxConfig.SetReferenceData(ItaIMU.CalculatorGuid, year, ItaIMUConfiguration.TBL_RATES_BY_CITY);
    taxConfig.SetGroupingData(null, cityReference);
    taxConfig.SubValues.Add(cityRateConfig);

    return services.GetRequiredService<IRepository<TaxConfig>>().AddAsync(taxConfig);
  }

  private async Task<City> SeedCityAsync(IServiceProvider services)
  {
    var city = new City("City", Guid.Empty, CountryISO3.ITA, Guid.Empty);
    await services.GetRequiredService<IRepository<City>>().AddAsync(city);

    return city;
  }

  private async Task<EstateUnit> SeedEstateUnitAsync(IServiceProvider services)
  {
    var subjectRepository = services.GetRequiredService<IRepository<Subject>>();
    var managementSubject = await subjectRepository.AddAsync(new ManagementSubjectFaker().Generate());

    var estateUsageTypeRepository = services.GetRequiredService<IRepository<EstateUsageType>>();
    var estateUsageType = await estateUsageTypeRepository.AddAsync(new EstateUsageTypeFaker());

    var estateMainUsageTypeRepository = services.GetRequiredService<IRepository<EstateMainUsageType>>();
    var estateMainUsageType = await estateMainUsageTypeRepository.AddAsync(new EstateMainUsageTypeFaker());

    var estateFaker = new EstateFaker
    {
      ManagementSubjectId = managementSubject.Id,
      UsageTypes = [estateUsageType],
      MainUsageTypes = [estateMainUsageType]
    };

    var estateRepository = services.GetRequiredService<IRepository<Estate>>();
    var estate = await estateRepository.AddAsync(estateFaker.Generate());

    var estateUnitRepository = services.GetRequiredService<IRepository<EstateUnit>>();
    var estateUnit = await estateUnitRepository.AddAsync(new EstateUnitFaker { Estates = [estate] }.Generate());

    return estateUnit;
  }
}
