using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.CustomCodeAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Infrastructure.Asst.Data;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Infrastructure.Common.Data;
using RealGimm.Infrastructure.Common.Data.Fakers;
using RealGimm.Plugin.Import.Common;
using RealGimm.Infrastructure.Prop.Data;
using RealGimm.Infrastructure.Prop.Data.Fakers;
using RealGimm.Plugin.Import.Prop;
using RealGimm.ImportTests.Anag.Fakers;
using RealGimm.ImportTests.Prop.Fakers;
using RealGimm.IntegrationTests.Prop.Data;

namespace RealGimm.ImportTests.Prop;

public sealed class DefaultPropDataImporterTests : BaseEfRepoTestFixture
{
  [Fact]
  public async Task Should_Import()
  {
    // Arrange
    var repositories = GetRepositories();
    await SeedConfigsAsync(repositories.Configs);
    await SeedEntitiesAsync(repositories);

    var serviceProvider = new ServiceCollection()
      .AddScoped<IRepository<Contract>>(_ => GetPropRepository<Contract>())
      .AddScoped(_ => new ContractMapper
      {
        _contractTypeRepository = GetPropRepository<ContractType>(),
        _contractRepository = GetPropRepository<Contract>(),
        _billItemTypeRepository = GetPropRepository<BillItemType>(),
        _logger = NullLogger<ContractMapper>.Instance
      })
      .BuildServiceProvider();

    var importer = CreateDataImporter(repositories, serviceProvider, await CreateFakeImportDataAsync(repositories));

    // Act
    await importer.PerformUpstreamUpdate(CancellationToken.None);

    // Assert
    var contracts = await repositories.Contracts.ListAsync();
    Assert.Equal(2, contracts.Count);

    await Verify(contracts);
  }

  private static async Task<FakeImportData> CreateFakeImportDataAsync(Repositories repositories)
  {
    var contractTypeFaker = new ContractTypeDTOFaker
    {
      EstateUsageTypes = await repositories.EstateUsageTypes.ListAsync()
    };
    
    var subjects = await repositories.Subjects.ListAsync();
    var contractTypes = contractTypeFaker.Generate(2).ToDictionary(contractType => contractType.InternalCode!);

    var contractFaker = new ContractDTOFaker
    {
      ManagementSubjects = subjects.OfType<ManagementSubject>().ToArray(),
      BillItemTypes = await repositories.BillItemTypes.ListAsync(),
      ContractTypes = contractTypes.Values,
    };

    var contracts = contractFaker.Generate(2);

    var counterparts = contracts.ToDictionary(
      contract => contract.InternalCode!,
      contract =>
      {
        var faker = new CounterpartDTOFaker(1, contractTypes[contract.ContractTypeId!].IsActive)
        {
          Contract = contract,
          Subjects = subjects
        };

        return faker.Generate(1).ToArray();
      });

    return new FakeImportData(
      contractTypes,
      counterparts,
      [],
      [],
      [],
      [],
      contracts,
      [],
      [],
      [],
      []);
  }

  private static FakeDefaultPropDataImporter CreateDataImporter(
    Repositories repositories,
    IServiceProvider serviceProvider,
    FakeImportData fakeImportData)
    => new()
    {
      _logger = NullLogger<DefaultPropDataImporter>.Instance,
      _serviceProvider = serviceProvider,
      _cities = repositories.Cities,
      _codeRepository = repositories.CustomCodes,
      _subjects = repositories.Subjects,
      _billItemTypes = repositories.BillItemTypes,
      _contractTypesRepository = repositories.ContractTypes,
      _subUnitRepository = repositories.EstateSubUnits,
      _usageTypesRepository = repositories.EstateUsageTypes,
      _estateRepository = repositories.Estates,
      _configRepository = repositories.Configs,
      _vatRateRepository = repositories.VatRates,
      FakeImportData = fakeImportData
    };

  private static async Task SeedEntitiesAsync(Repositories repositories)
  {
    var cities = new ImportedCityFaker().Generate(2);
    await repositories.Cities.AddRangeAsync(cities);

    var customCodes = cities.Select(city =>
    {
      var customCode = new CustomCode();
      customCode.SetCodes(city.Id.ToString(), city.Id.ToString());

      customCode.SetData(
        city.Name,
        DefaultCommonDataImporter.IMPORT_CITY_PROVIDER,
        typeof(City).Name,
        CustomCodeFunction.Transcoding);

      return customCode;
    });

    await repositories.CustomCodes.AddRangeAsync(customCodes);

    var managementSubject = new ManagementSubjectFaker().Generate();
    await repositories.Subjects.AddAsync(managementSubject);

    var estateUsageType = new EstateUsageTypeFaker().Generate();
    await repositories.EstateUsageTypes.AddAsync(estateUsageType);

    var vatRates = new VATRateFaker().Generate(4);
    await repositories.VatRates.AddRangeAsync(vatRates);

    var billItemType = new BillItemTypeFaker().UseVATRates(vatRates).Generate();
    await repositories.BillItemTypes.AddAsync(billItemType);
  }

  private static async Task SeedConfigsAsync(IRepository<Config> repository)
  {
    var connectionStringConfig = new Config();
    connectionStringConfig.SetReferenceData(
      ConfigWellKnownNames.DATA_IMPORT_CONNECTION_STRING,
      ConfigFunction.DataImport);
    connectionStringConfig.SetValue("fake-connection-string");

    await repository.AddAsync(connectionStringConfig);
    
    var disableValidationConfig = new Config();
    disableValidationConfig.SetReferenceData(
      ConfigWellKnownNames.DATA_IMPORT_DISABLE_VALIDATION,
      ConfigFunction.DataImport);
    disableValidationConfig.SetValue("true");

    await repository.AddAsync(disableValidationConfig);
  }

  private Repositories GetRepositories()
    => new(
        GetCommonRepository<City>(),
        GetCommonRepository<CustomCode>(),
        GetAnagRepository<Subject>(),
        GetPropRepository<BillItemType>(),
        GetPropRepository<ContractType>(),
        GetPropRepository<Contract>(),
        GetAsstRepository<EstateSubUnit>(),
        GetAsstRepository<EstateUsageType>(),
        GetCommonRepository<VATRate>(),
        GetCommonRepository<Config>(),
        GetAsstRepository<Estate>());

  private record Repositories(
    CommonEfRepository<City> Cities,
    CommonEfRepository<CustomCode> CustomCodes,
    AnagEfRepository<Subject> Subjects,
    PropEfRepository<BillItemType> BillItemTypes,
    PropEfRepository<ContractType> ContractTypes,
    PropEfRepository<Contract> Contracts,
    AsstEfRepository<EstateSubUnit> EstateSubUnits,
    AsstEfRepository<EstateUsageType> EstateUsageTypes,
    CommonEfRepository<VATRate> VatRates,
    CommonEfRepository<Config> Configs,
    AsstEfRepository<Estate> Estates);
}
