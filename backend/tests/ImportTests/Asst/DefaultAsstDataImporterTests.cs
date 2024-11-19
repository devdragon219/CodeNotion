using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.FloorTemplateAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.CustomCodeAggregate;
using RealGimm.FunctionalTests.Web.Fakers.Asst;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Infrastructure.Asst.Data;
using RealGimm.Plugin.Import.Asst;
using RealGimm.Infrastructure.Common.Data;
using RealGimm.Plugin.Import.Common;
using RealGimm.ImportTests.Anag.Fakers;
using RealGimm.ImportTests.Asst.Fakers;
using RealGimm.IntegrationTests.Asst.Data;
using RealGimm.Core.Asst.CadastralCategoryAggregate;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.Core.Asst.FunctionAreaAggregate;

namespace RealGimm.ImportTests.Asst;

public sealed class DefaultAsstDataImporterTests : BaseEfRepoTestFixture
{
  [Fact]
  public async Task Should_Import()
  {
    // Arrange
    var repositories = GetRepositories();
    await SeedConfigsAsync(repositories.Configs);
    await SeedEntitiesAsync(repositories);

    var serviceProvider = new ServiceCollection()
      .AddScoped<IRepository<Estate>>(_ => GetAsstRepository<Estate>())
      .AddScoped<IRepository<EstateUnit>>(_ => GetAsstRepository<EstateUnit>())
      .AddScoped(_ => new EstateMapper
      {
        _estateMainUsageType = GetAsstRepository<EstateMainUsageType>(),
        _estateUsageType = GetAsstRepository<EstateUsageType>(),
        _estateRepository = GetAsstRepository<Estate>(),
        _customEstateEnumMapper = new CustomEstateEnumMapper(),
        _logger = NullLogger<EstateMapper>.Instance,
      })
      .BuildServiceProvider();

    var importer = CreateDataImporter(repositories, serviceProvider, await CreateFakeImportDataAsync(repositories));

    // Act
    await importer.PerformUpstreamUpdate(CancellationToken.None);

    // Assert
    var estates = await repositories.Estates.ListAsync();
    Assert.Equal(2, estates.Count);
    await Verify(estates);
  }

  private static async Task<FakeImportData> CreateFakeImportDataAsync(Repositories repositories)
  {
    var estateMainUsageTypes = new SimpleCodeDTOFaker().Generate(3).ToDictionary(type => type.Id);
    var estateUsageTypes = new SimpleCodeDTOFaker().UseSeed(2).Generate(3).ToDictionary(type => type.Id);

    var esatateFaker = new EstateDTOFaker
    {
      Cities = await repositories.Cities.ListAsync(),
      CitiesCustomCodes = await repositories.CustomCodes.ListAsync(),
      OwnerManagementSubjects = await repositories.Subjects.AsQueryable().OfType<ManagementSubject>().ToListAsync(),
      EstateMainUsageTypes = estateMainUsageTypes.Values,
      EstateUsageTypes = estateUsageTypes.Values
    };

    var esatates = esatateFaker.Generate(2);

    return new FakeImportData(
      UsageTypes: estateUsageTypes,
      UsageMacroTypes: estateMainUsageTypes,
      Estates: esatates,
      EstateAddresses: [],
      EstateBuildingTypes: [],
      EstateOwnershipTypes: [],
      EstateSubUnitsByUnit: [],
      EstateUnitNotes: [],
      EstateUnits: [],
      AllFloors: [],
      FloorsByEstate: [],
      StairsByEstate: [],
      EstateUnitOriginActs: [],
      AllFunctionAreas: [],
      EstateUnitSurfaces: [],
      CadastralUnits: [],
      CadastralCoordinates: []);
  }

  private static FakeDefaultAsstDataImporter CreateDataImporter(
    Repositories repositories,
    IServiceProvider serviceProvider,
    FakeImportData fakeImportData)
    => new()
    {
      _logger = NullLogger<DefaultAsstDataImporter>.Instance,
      _serviceProvider = serviceProvider,
      _cities = repositories.Cities,
      _codeRepository = repositories.CustomCodes,
      _subjects = repositories.Subjects,
      _estateMainUsageTypes = repositories.EstateMainUsageTypes,
      _estateUsageTypes = repositories.EstateUsageTypes,
      _estateUnits = repositories.EstateUnits,
      _estates = repositories.Estates,
      _configRepository = repositories.Configs,
      _floors = repositories.Floors,
      _functionAreas = repositories.FunctionAreas,
      _cadastralCategoryRepo = repositories.CadastralCategories,
      _cadastralLandCategoryRepo = repositories.CadastralLandCategories,
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
  }

  private static async Task SeedConfigsAsync(IRepository<Config> repository)
  {
    var connectionStringConfig = new Config();
    connectionStringConfig.SetReferenceData(
      ConfigWellKnownNames.DATA_IMPORT_CONNECTION_STRING,
      ConfigFunction.DataImport);
    connectionStringConfig.SetValue("fake-connection-string");

    await repository.AddAsync(connectionStringConfig);
  }

  private Repositories GetRepositories()
    => new(
        GetCommonRepository<City>(),
        GetCommonRepository<CustomCode>(),
        GetAnagRepository<Subject>(),
        GetAsstRepository<EstateMainUsageType>(),
        GetAsstRepository<EstateUsageType>(),
        GetAsstRepository<EstateUnit>(),
        GetAsstRepository<FloorTemplate>(),
        GetAsstRepository<Estate>(),
        GetAsstRepository<FunctionArea>(),
        GetCommonRepository<Config>(),
        GetAsstRepository<CadastralCategory>(),
        GetAsstRepository<CadastralLandCategory>());

  private record Repositories(
    CommonEfRepository<City> Cities,
    CommonEfRepository<CustomCode> CustomCodes,
    AnagEfRepository<Subject> Subjects,
    AsstEfRepository<EstateMainUsageType> EstateMainUsageTypes,
    AsstEfRepository<EstateUsageType> EstateUsageTypes,
    AsstEfRepository<EstateUnit> EstateUnits,
    AsstEfRepository<FloorTemplate> Floors,
    AsstEfRepository<Estate> Estates,
    AsstEfRepository<FunctionArea> FunctionAreas,
    CommonEfRepository<Config> Configs,
    AsstEfRepository<CadastralCategory> CadastralCategories,
    AsstEfRepository<CadastralLandCategory> CadastralLandCategories);
}
