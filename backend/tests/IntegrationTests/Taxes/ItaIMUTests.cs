using System.Globalization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate;
using RealGimm.Core.Asst.CadastralCategoryAggregate;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.FloorTemplateAggregate;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.TaxConfigAggregate;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Resources;
using RealGimm.Core.Taxes;
using RealGimm.Core.Taxes.ItaIMU;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using Address = RealGimm.Core.Asst.EstateAggregate.Address;
using EstateFaker = RealGimm.FunctionalTests.Web.Fakers.Asst.EstateFaker;
using EstateUnitFaker = RealGimm.FunctionalTests.Web.Fakers.Asst.EstateUnitFaker;

namespace RealGimm.IntegrationTests.Taxes;

public sealed class ItaIMUTests : BaseEfRepoTestFixture
{
  [Theory]
  [InlineData(EstateUnitType.Building)]
  [InlineData(EstateUnitType.Other)]
  public async Task Should_CalculateCorrectValues_When_ValidBuildingOrValidOther(EstateUnitType estateUnitType)
  {
    // Arrange
    var city = await SeedCityAsync();  
    await SeedCityRateAsync("ACCUMOLI", 2024, 0.85m, city.Guid);
    await SeedAsstAsync();

    var taxConfigs = CreateCadastralUnitTaxConfigs(
      ownershipStartDate: new DateOnly(2024, 01, 01),
      ownershipEndDate: new DateOnly(2024, 12, 31),
      rate: "ACCUMOLI");

    var income = new CadastralUnitIncome();
    income.SetMetricsAmounts(null, null, null, cadastralAmount: 1000);
    income.SetCadastralCategory(await GetCadastralCategory("C/01"));

    var cadastralUnit = CreateCadastralUnit(await SeedEstateUnitAsync(), city, estateUnitType, income, taxConfigs);
    await GetAsstRepository<CadastralUnit>().AddAsync(cadastralUnit);

    var calculator = CreateCalculator();

    // Act
    Assert.True(await calculator.CheckApplicabilityAsync(cadastralUnit));

    var result = (await calculator.GetStatusesPerUnit([cadastralUnit], 2024, CancellationToken.None))[cadastralUnit];

    // Assert
    AssertFirstPaymentDateIsCorrect(2024, result.FirstPaymentDate);

    Assert.NotNull(result.SecondPaymentDate);
    AssertSecondPaymentDateIsCorrect(2024, result.SecondPaymentDate.Value);

    Assert.Null(result.FirstHalf.Issue);
    Assert.Equal(245.44m, result.FirstHalf.PaymentAmount);
    Assert.Equal(6, result.FirstHalf.PropertyMonths);

    Assert.NotNull(result.SecondHalf);
    Assert.Null(result.SecondHalf.Issue);
    Assert.Equal(245.44m, result.SecondHalf.PaymentAmount);
    Assert.Equal(6, result.SecondHalf.PropertyMonths);
  }

  // TODO: verify the logic of this test
  [Theory]
  [InlineData(EstateUnitType.UrbanArea)]
  [InlineData(EstateUnitType.Ground)]
  public async Task Should_CalculateCorrectValues_When_ValidUrbanAreaOrValidGround(EstateUnitType estateUnitType)
  {
    // Arrange
    var city = await SeedCityAsync();
    await SeedCityRateAsync("ACCUMOLI", 2024, 0.85m, city.Guid);
    await SeedAsstAsync();

    var taxConfigs = CreateCadastralUnitTaxConfigs(
      ownershipStartDate: new DateOnly(2024, 01, 01),
      ownershipEndDate: new DateOnly(2024, 12, 31),
      rate: "ACCUMOLI");

    var income = new CadastralUnitIncome();
    income.SetLandAmount(300);
    income.SetFarmAmount(700);
    income.SetCadastralCategory(await GetCadastralCategory("C/01"));

    var cadastralUnit = CreateCadastralUnit(await SeedEstateUnitAsync(), city, estateUnitType, income, taxConfigs);
    await GetAsstRepository<CadastralUnit>().AddAsync(cadastralUnit);

    var calculator = CreateCalculator();

    // Act
    Assert.True(await calculator.CheckApplicabilityAsync(cadastralUnit));

    var result = (await calculator.GetStatusesPerUnit([cadastralUnit], 2024, CancellationToken.None))[cadastralUnit];

    // Assert
    AssertFirstPaymentDateIsCorrect(2024, result.FirstPaymentDate);

    Assert.NotNull(result.SecondPaymentDate);
    AssertSecondPaymentDateIsCorrect(2024, result.SecondPaymentDate.Value);

    Assert.Null(result.FirstHalf.Issue);
    Assert.Equal(245.44m, result.FirstHalf.PaymentAmount);
    Assert.Equal(6, result.FirstHalf.PropertyMonths);

    Assert.NotNull(result.SecondHalf);
    Assert.Null(result.SecondHalf.Issue);
    Assert.Equal(245.44m, result.SecondHalf.PaymentAmount);
    Assert.Equal(6, result.SecondHalf.PropertyMonths);
  }

  // TODO: verify the logic of this test
  [Fact]
  public async Task Should_CalculateCorrectValues_When_ValidBuildingArea()
  {
    // Arrange
    var city = await SeedCityAsync();
    await SeedCityRateAsync("ACCUMOLI", 2024, 0.85m, city.Guid);
    await SeedAsstAsync();

    var taxConfigs = CreateCadastralUnitTaxConfigs(
      ownershipStartDate: new DateOnly(2024, 01, 01),
      ownershipEndDate: new DateOnly(2024, 12, 31),
      rate: "ACCUMOLI");

    var income = new CadastralUnitIncome();
    income.SetRegisteredSurface(10);
    income.SetMarketValue(100);
    income.SetCategories(null, "1");
    income.SetCadastralCategory(await GetCadastralCategory("C/01")); // should this line be removed?

    var cadastralUnit = CreateCadastralUnit(await SeedEstateUnitAsync(), city, EstateUnitType.BuildingArea, income, taxConfigs);
    await GetAsstRepository<CadastralUnit>().AddAsync(cadastralUnit);

    var calculator = CreateCalculator();

    // Act
    Assert.True(await calculator.CheckApplicabilityAsync(cadastralUnit));

    var result = (await calculator.GetStatusesPerUnit([cadastralUnit], 2024, CancellationToken.None))[cadastralUnit];

    // Assert
    AssertFirstPaymentDateIsCorrect(2024, result.FirstPaymentDate);

    Assert.NotNull(result.SecondPaymentDate);
    AssertSecondPaymentDateIsCorrect(2024, result.SecondPaymentDate.Value);

    Assert.Null(result.FirstHalf.Issue);
    Assert.Equal(245.44m, result.FirstHalf.PaymentAmount); // should be 4.30 instead?
    Assert.Equal(6, result.FirstHalf.PropertyMonths);

    Assert.NotNull(result.SecondHalf);
    Assert.Null(result.SecondHalf.Issue);
    Assert.Equal(245.44m, result.SecondHalf.PaymentAmount); // should be 4.25 instead?
    Assert.Equal(6, result.SecondHalf.PropertyMonths);
  }

  [Fact]
  public async Task Should_ReportIssue_When_CityRateIsMissing()
  {
    // Arrange
    var city = await SeedCityAsync();
    await SeedAsstAsync();

    var taxConfigs = CreateCadastralUnitTaxConfigs(
      ownershipStartDate: new DateOnly(2024, 01, 01),
      ownershipEndDate: new DateOnly(2024, 12, 31),
      rate: "ACCUMOLI");

    var income = new CadastralUnitIncome();
    income.SetMetricsAmounts(null, null, null, cadastralAmount: 1000);
    income.SetCadastralCategory(await GetCadastralCategory("C/01"));

    var cadastralUnit = CreateCadastralUnit(await SeedEstateUnitAsync(), city, EstateUnitType.Building, income, taxConfigs);
    await GetAsstRepository<CadastralUnit>().AddAsync(cadastralUnit);

    var calculator = CreateCalculator();

    // Act
    Assert.True(await calculator.CheckApplicabilityAsync(cadastralUnit));

    var result = (await calculator.GetStatusesPerUnit([cadastralUnit], 2024, CancellationToken.None))[cadastralUnit];

    // Assert
    AssertFirstPaymentDateIsCorrect(2024, result.FirstPaymentDate);

    Assert.NotNull(result.SecondPaymentDate);
    AssertSecondPaymentDateIsCorrect(2024, result.SecondPaymentDate.Value);

    Assert.Equal(CalculationIssue.MissingOrZeroRate, result.FirstHalf.Issue);

    Assert.NotNull(result.SecondHalf);
    Assert.Equal(CalculationIssue.MissingOrZeroRate, result.SecondHalf.Issue);
  }

  [Fact]
  public async Task Should_ReportIssue_When_RateConfigValueIsMissing()
  {
    // Arrange
    var city = await SeedCityAsync();
    await SeedCityRateAsync("ACCUMOLI", 2023, 0.86m, city.Guid);
    await SeedCityRateAsync("ACCUMOLI", 2024, 0.85m, city.Guid);
    await SeedAsstAsync();

    var taxConfigs = CreateCadastralUnitTaxConfigs(
      ownershipStartDate: new DateOnly(2024, 01, 01),
      ownershipEndDate: new DateOnly(2024, 12, 31));

    var income = new CadastralUnitIncome();
    income.SetMetricsAmounts(null, null, null, cadastralAmount: 1000);
    income.SetCadastralCategory(await GetCadastralCategory("C/01"));

    var cadastralUnit = CreateCadastralUnit(await SeedEstateUnitAsync(), city, EstateUnitType.Building, income, taxConfigs);
    await GetAsstRepository<CadastralUnit>().AddAsync(cadastralUnit);

    var calculator = CreateCalculator();

    // Act
    Assert.True(await calculator.CheckApplicabilityAsync(cadastralUnit));

    var result = (await calculator.GetStatusesPerUnit([cadastralUnit], 2024, CancellationToken.None))[cadastralUnit];

    // Assert
    AssertFirstPaymentDateIsCorrect(2024, result.FirstPaymentDate);

    Assert.NotNull(result.SecondPaymentDate);
    AssertSecondPaymentDateIsCorrect(2024, result.SecondPaymentDate.Value);

    Assert.Equal(result.FirstHalf.Issue, CalculationIssue.MissingOrZeroRate);

    Assert.NotNull(result.SecondHalf);
    Assert.Equal(result.SecondHalf.Issue, CalculationIssue.MissingOrZeroRate);
  }

  [Fact]
  public async Task Should_ReportIssue_When_OwnershipStartDateIsMissing()
  {
    // Arrange
    var city = await SeedCityAsync();
    await SeedCityRateAsync("ACCUMOLI", 2023, 0.86m, city.Guid);
    await SeedCityRateAsync("ACCUMOLI", 2024, 0.85m, city.Guid);
    await SeedAsstAsync();

    var taxConfigs = CreateCadastralUnitTaxConfigs(
      ownershipEndDate: new DateOnly(2024, 12, 31),
      rate: "ACCUMOLI");

    var income = new CadastralUnitIncome();
    income.SetMetricsAmounts(null, null, null, cadastralAmount: 1000);
    income.SetCadastralCategory(await GetCadastralCategory("C/01"));

    var cadastralUnit = CreateCadastralUnit(await SeedEstateUnitAsync(), city, EstateUnitType.Building, income, taxConfigs);
    await GetAsstRepository<CadastralUnit>().AddAsync(cadastralUnit);

    var calculator = CreateCalculator();

    // Act
    Assert.True(await calculator.CheckApplicabilityAsync(cadastralUnit));

    var result = (await calculator.GetStatusesPerUnit([cadastralUnit], 2024, CancellationToken.None))[cadastralUnit];

    // Assert
    AssertFirstPaymentDateIsCorrect(2024, result.FirstPaymentDate);

    Assert.NotNull(result.SecondPaymentDate);
    AssertSecondPaymentDateIsCorrect(2024, result.SecondPaymentDate.Value);

    Assert.Equal(result.FirstHalf.Issue, CalculationIssue.MissingOrInvalidOwnershipDates);

    Assert.NotNull(result.SecondHalf);
    Assert.Equal(result.SecondHalf.Issue, CalculationIssue.MissingOrInvalidOwnershipDates);
  }

  [Fact]
  public async Task Should_ReportIssue_When_CadastralCategoryIsMissing()
  {
    // Arrange
    var city = await SeedCityAsync();
    await SeedCityRateAsync("ACCUMOLI", 2023, 0.86m, city.Guid);
    await SeedCityRateAsync("ACCUMOLI", 2024, 0.85m, city.Guid);
    await SeedAsstAsync();

    var taxConfigs = CreateCadastralUnitTaxConfigs(
      ownershipStartDate: new DateOnly(2024, 01, 01),
      ownershipEndDate: new DateOnly(2024, 12, 31),
      rate: "ACCUMOLI");

    var income = new CadastralUnitIncome();
    income.SetMetricsAmounts(null, null, null, cadastralAmount: 1000);

    var cadastralUnit = CreateCadastralUnit(await SeedEstateUnitAsync(), city, EstateUnitType.Building, income, taxConfigs);
    await GetAsstRepository<CadastralUnit>().AddAsync(cadastralUnit);

    var calculator = CreateCalculator();

    // Act
    Assert.True(await calculator.CheckApplicabilityAsync(cadastralUnit));

    var result = (await calculator.GetStatusesPerUnit([cadastralUnit], 2024, CancellationToken.None))[cadastralUnit];

    // Assert
    AssertFirstPaymentDateIsCorrect(2024, result.FirstPaymentDate);

    Assert.NotNull(result.SecondPaymentDate);
    AssertSecondPaymentDateIsCorrect(2024, result.SecondPaymentDate.Value);

    Assert.Equal(result.FirstHalf.Issue, CalculationIssue.MissingCadastralCategory);

    Assert.NotNull(result.SecondHalf);
    Assert.Equal(result.SecondHalf.Issue, CalculationIssue.MissingCadastralCategory);
  }

  [Fact]
  public async Task Should_ReportIssue_When_MissingCadastralIncome()
  {
    // Arrange
    var city = await SeedCityAsync();
    await SeedAsstAsync();

    var taxConfigs = CreateCadastralUnitTaxConfigs(
      ownershipStartDate: new DateOnly(2024, 01, 01),
      ownershipEndDate: new DateOnly(2024, 12, 31),
      rate: "ACCUMOLI");

    var income = new CadastralUnitIncome();
    income.SetCadastralCategory(await GetCadastralCategory("C/01"));

    var cadastralUnit = CreateCadastralUnit(await SeedEstateUnitAsync(), city, EstateUnitType.Building, income, taxConfigs);
    await GetAsstRepository<CadastralUnit>().AddAsync(cadastralUnit);

    var calculator = CreateCalculator();

    // Act
    Assert.True(await calculator.CheckApplicabilityAsync(cadastralUnit));

    var result = (await calculator.GetStatusesPerUnit([cadastralUnit], 2024, CancellationToken.None))[cadastralUnit];

    // Assert
    AssertFirstPaymentDateIsCorrect(2024, result.FirstPaymentDate);

    Assert.NotNull(result.SecondPaymentDate);
    AssertSecondPaymentDateIsCorrect(2024, result.SecondPaymentDate.Value);

    Assert.Equal(CalculationIssue.MissingCadastralIncomeData, result.FirstHalf.Issue);

    Assert.NotNull(result.SecondHalf);
    Assert.Equal(CalculationIssue.MissingCadastralIncomeData, result.SecondHalf.Issue);
  }

  private void AssertFirstPaymentDateIsCorrect(int expectedYear, DateOnly date)
  {
    Assert.True(date.DayOfWeek is not DayOfWeek.Saturday and not DayOfWeek.Sunday);
    Assert.Equal(06, date.Month);
    Assert.Equal(expectedYear, date.Year);
  }
  
  private void AssertSecondPaymentDateIsCorrect(int expectedYear, DateOnly actualDate)
  {
    Assert.True(actualDate.DayOfWeek is not DayOfWeek.Saturday and not DayOfWeek.Sunday);
    Assert.Equal(12, actualDate.Month);
    Assert.Equal(expectedYear, actualDate.Year);
  }

  private Task<CadastralCategory> GetCadastralCategory(string externalCode)
    => GetAsstRepository<CadastralCategory>()
      .AsQueryable()
      .SingleAsync(category => category.ExternalCode == externalCode);

  private ItaIMU CreateCalculator()
    => new()
    {
      _cadastralUnitRepository = GetAsstRepository<CadastralUnit>(),
      _cityRepository = GetCommonRepository<City>(),
      _taxConfigRepository = GetCommonRepository<TaxConfig>(),
      _subjectRepository = GetAnagRepository<Subject>(),
      _logger = new NullLogger<ItaIMU>()
    };

  private CadastralUnit CreateCadastralUnit(
    EstateUnit estateUnit,
    City city,
    EstateUnitType estateUnitType,
    CadastralUnitIncome income,
    IEnumerable<CadastralUnitTaxConfig> taxConfigs)
  {
    var cadastralUnit = new CadastralUnit();
    cadastralUnit.SetEstateUnit(estateUnit);
    cadastralUnit.SetAddress(CreateAddress(city));
    cadastralUnit.SetInternalCode("UC000001");
    cadastralUnit.SetStatus(CadastralUnitStatus.Existing);
    cadastralUnit.SetDates(new DateOnly(2020, 01, 01), null);
    cadastralUnit.SetType(estateUnitType);
    cadastralUnit.SetIncome(income);
    cadastralUnit.TaxConfig.AddRange(taxConfigs);

    return cadastralUnit;
  }

  private IEnumerable<CadastralUnitTaxConfig> CreateCadastralUnitTaxConfigs(
    DateOnly? ownershipStartDate = null,
    DateOnly? ownershipEndDate = null,
    string? rate = null)
  {
    var enabledConfig = new CadastralUnitTaxConfig();
    enabledConfig.SetValue("true");

    enabledConfig.SetReference(
      "ita-enabled",
      ItaIMU.CalculatorGuid,
      isMandatory: true,
      new Guid("461cba5e-f200-462d-8e3a-35d1f1b87068"),
      CustomFieldType.SingleItemFromList);

    yield return enabledConfig;

    // ownership start date
    if (ownershipStartDate.HasValue)
    {
      var ownershipStartDateConfig = new CadastralUnitTaxConfig();
      ownershipStartDateConfig.SetValue(ownershipStartDate.Value.ToString(CultureInfo.InvariantCulture));

      ownershipStartDateConfig.SetReference(
        "ita-ownership-start",
        ItaIMU.CalculatorGuid,
        isMandatory: true,
        new Guid("aaf7f085-6182-48bd-a662-4a48ce3fa840"),
        CustomFieldType.Date);

      yield return ownershipStartDateConfig;
    }

    // ownership end date
    if (ownershipEndDate.HasValue)
    {
      var ownershipEndDateConfig = new CadastralUnitTaxConfig();
      ownershipEndDateConfig.SetValue(ownershipEndDate.Value.ToString(CultureInfo.InvariantCulture));

      ownershipEndDateConfig.SetReference(
        "ita-ownership-end",
        ItaIMU.CalculatorGuid,
        isMandatory: true,
        new Guid("bf909dfa-8d34-4138-a45d-339d5c0fc051"),
        CustomFieldType.Date);

      yield return ownershipEndDateConfig;
    }

    // rate
    if (rate is not null)
    {
      var rateConfig = new CadastralUnitTaxConfig();
      rateConfig.SetValue(rate);

      rateConfig.SetReference(
        "ita-rate",
        ItaIMU.CalculatorGuid,
        isMandatory: true,
        new Guid("529b61c2-5632-4e64-8b56-aab85886518a"),
        CustomFieldType.SingleItemFromList);

      yield return rateConfig;
    }
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

  private Task<TaxConfig> SeedCityRateAsync(string code, int year, decimal rate, Guid cityReference)
  {
    var cityRateConfig = new TaxConfigSubValue();
    cityRateConfig.SetReferenceData(code, string.Empty, TaxConfigurationBase.SUBTBL_RATES);
    cityRateConfig.SetValues(SubValueType.Number, null, null, rate, null);

    var taxConfig = new TaxConfig();
    taxConfig.SetReferenceData(ItaIMU.CalculatorGuid, year, ItaIMUConfiguration.TBL_RATES_BY_CITY);
    taxConfig.SetGroupingData(null, cityReference);
    taxConfig.SubValues.Add(cityRateConfig);

    return GetCommonRepository<TaxConfig>().AddAsync(taxConfig);
  }

  private Task SeedAsstAsync()
  {
    var localizerMock = new Mock<IStringLocalizer<SharedResources>>();
    localizerMock.Setup(localizer => localizer[It.IsAny<string>()]).Returns<string>(key => new LocalizedString(key, key));

    var asstDataSeeder = new AsstDataSeeder(
      NullLogger<AsstDataSeeder>.Instance,
      localizerMock.Object,
      GetAsstRepository<CadastralCategory>(),
      GetAsstRepository<EstateUsageType>(),
      GetAsstRepository<EstateMainUsageType>(),
      GetAsstRepository<CadastralLandCategory>(),
      GetAsstRepository<FloorTemplate>(),
      GetAsstRepository<FunctionArea>());

    return asstDataSeeder.InitializeAsync();
  }

  private async Task<City> SeedCityAsync()
  {
    var city = new City("City", Guid.Empty, CountryISO3.ITA, Guid.Empty);
    await GetCommonRepository<City>().AddAsync(city);

    return city;
  }

  private async Task<EstateUnit> SeedEstateUnitAsync()
  {
    var subjectRepository = GetAnagRepository<Subject>();
    var managementSubject = await subjectRepository.AddAsync(new ManagementSubjectFaker().Generate());

    var estateUsageTypeRepository = GetAsstRepository<EstateUsageType>();
    var estateUsageType = await estateUsageTypeRepository.AddAsync(new EstateUsageTypeFaker());

    var estateMainUsageTypeRepository = GetAsstRepository<EstateMainUsageType>();
    var estateMainUsageType = await estateMainUsageTypeRepository.AddAsync(new EstateMainUsageTypeFaker());

    var estateFaker = new EstateFaker
    {
      ManagementSubjectId = managementSubject.Id,
      UsageTypes = [estateUsageType],
      MainUsageTypes = [estateMainUsageType]
    };

    var estateRepository = GetAsstRepository<Estate>();
    var estate = await estateRepository.AddAsync(estateFaker.Generate());

    var estateUnitRepository = GetAsstRepository<EstateUnit>();
    var estateUnit = await estateUnitRepository.AddAsync(new EstateUnitFaker { Estates = [estate] }.Generate());

    return estateUnit;
  }
}
