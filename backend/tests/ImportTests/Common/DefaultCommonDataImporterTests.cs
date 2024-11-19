using Microsoft.Extensions.Logging.Abstractions;
using RealGimm.Core;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.CustomCodeAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;
using RealGimm.Infrastructure.Common.Data;
using RealGimm.Plugin.Import.Common;
using RealGimm.Infrastructure.Prop.Data;
using RealGimm.ImportTests.Common.Fakers;
using RealGimm.IntegrationTests.Common.Data;

namespace RealGimm.ImportTests.Common;

public sealed class DefaultCommonDataImporterTests : BaseEfRepoTestFixture
{
  [Fact]
  public async Task Should_Import()
  {
    // Arrange
    var repositories = GetRepositories();
    await SeedConfigsAsync(repositories.Configs);

    var importer = CreateDataImporter(repositories, CreateFakeImportData());

    // Act
    await importer.PerformUpstreamUpdate(CancellationToken.None);

    // Assert
    await Verify(new
    {
      Cities = await repositories.Cities.ListAsync(),
      VatRates = await repositories.VatRates.ListAsync(),
      BillItemTypes = await repositories.BillItemTypes.ListAsync(),
      CustomCodes = await repositories.CustomCodes.ListAsync(),
    })
      .IgnoreMembers("CreationDate");
  }

  private static FakeImportData CreateFakeImportData()
  {
    var citiesFromAnagImportData = new CityDTOFaker().Generate(1);
    var citiesFromAsstImportData = new CityDTOFaker().UseSeed(2).Generate(1);
    var fakeVatRatesImportData = new VATRateDTOFaker().Generate(3).ToDictionary(vatRate => vatRate.InternalCode);

    var billItemTypesImportData = new BillItemTypeDTOFaker { VATRates = fakeVatRatesImportData.Values }
      .Generate(1)
      .ToDictionary(vatRate => vatRate.InternalCode);

    return new FakeImportData(
      citiesFromAnagImportData,
      citiesFromAsstImportData,
      fakeVatRatesImportData,
      billItemTypesImportData);
  }

  private static FakeDefaultCommonDataImporter CreateDataImporter(Repositories repositories, FakeImportData fakeImportData)
    => new()
    {
      _logger = NullLogger<DefaultCommonDataImporter>.Instance,
      _cities = repositories.Cities,
      _vatRates = repositories.VatRates,
      _billItemTypes = repositories.BillItemTypes,
      _codeRepository = repositories.CustomCodes,
      _configRepository = repositories.Configs,
      _accountingItems = repositories.AccountingItems,
      FakeImportData = fakeImportData
    };

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
        GetRepository<City>(),
        GetRepository<VATRate>(),
        GetPropRepository<BillItemType>(),
        GetRepository<CustomCode>(),
        GetRepository<AccountingItem>(),
        GetRepository<Config>());

  private record Repositories(
    CommonEfRepository<City> Cities,
    CommonEfRepository<VATRate> VatRates,
    PropEfRepository<BillItemType> BillItemTypes,
    CommonEfRepository<CustomCode> CustomCodes,
    CommonEfRepository<AccountingItem> AccountingItems,
    CommonEfRepository<Config> Configs);
}
