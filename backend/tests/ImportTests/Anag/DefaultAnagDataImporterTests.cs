using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using RealGimm.Core;
using RealGimm.Core.Anag.Services;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.CustomCodeAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.Shared;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Plugin.Import.Anag;
using RealGimm.Plugin.Import.Anag.Models;
using RealGimm.Infrastructure.Common.Data;
using RealGimm.Plugin.Import.Common;
using RealGimm.ImportTests.Anag.Fakers;
using RealGimm.SharedKernel.Interfaces;
using Rebus.Bus;
using RealGimm.IntegrationTests.Anag.Data;

namespace RealGimm.ImportTests.Anag;

public sealed class DefaultAnagDataImporterTests : BaseEfRepoTestFixture
{
  [Fact]
  public async Task Should_Import()
  {
    // Arrange
    var repositories = GetRepositories();
    await SeedConfigsAsync(repositories.Configs);
    await SeedEntitiesAsync(repositories);

    var serviceProvider = new ServiceCollection()
      .AddScoped(_ => new SubjectMapper
      {
        _subjectCategoryRepository = GetAnagRepository<SubjectCategory>(),
        _subjectRepository = GetAnagRepository<Subject>(),
        _logger = NullLogger<SubjectMapper>.Instance
      })
      .AddScoped(_ => new SubjectUpsertService(
        GetAnagRepository<Subject>(),
        GetCommonRepository<City>(),
        GetIAMRepository<User>(),
        new CheckItalianTaxID(),
        new Mock<IBus>().Object,
        new Mock<IUserDataProvider>().Object))
      .BuildServiceProvider();

    var importer = CreateDataImporter(repositories, serviceProvider, await CreateFakeImportDataAsync(repositories));

    // Act
    await importer.PerformUpstreamUpdate(CancellationToken.None);

    // Assert
    var subjects = await repositories.Subjects.ListAsync();

    Assert.Equal(5, subjects.Count);
    await Verify(subjects);
  }

  private static async Task<FakeImportData> CreateFakeImportDataAsync(Repositories repositories)
  {
    var subjectDtoFaker = new SubjectDTOFaker
    {
      Cities = await repositories.Cities.ListAsync(),
      CitiesCustomCodes = await repositories.CustomCodes.ListAsync()
    };

    var managementSubject = subjectDtoFaker.Generate();

    subjectDtoFaker.ParentSubjects = [managementSubject];
    var subjects = subjectDtoFaker.Generate(4).Prepend(managementSubject);

    var contacts = new ContactDTOFaker { Subjects = subjects }
      .Generate(5)
      .GroupBy(contact => contact.SubjectInternalCode!)
      .ToDictionary(group => group.Key, group => (IEnumerable<ContactDTO>)group);

    return new FakeImportData(
      [],
      [],
      contacts,
      [],
      [],
      subjects);
  }

  private static FakeDefaultAnagDataImporter CreateDataImporter(
    Repositories repositories,
    IServiceProvider serviceProvider,
    FakeImportData fakeImportData)
    => new()
    {
      _logger = NullLogger<DefaultAnagDataImporter>.Instance,
      _cities = repositories.Cities,
      _serviceProvider = serviceProvider,
      _codeRepository = repositories.CustomCodes,
      _configRepository = repositories.Configs,
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
        GetAnagRepository<SubjectCategory>(),
        GetAnagRepository<Subject>(),
        GetCommonRepository<Config>());

  private record Repositories(
    CommonEfRepository<City> Cities,
    CommonEfRepository<CustomCode> CustomCodes,
    AnagEfRepository<SubjectCategory> SubjectCategory,
    AnagEfRepository<Subject> Subjects,
    CommonEfRepository<Config> Configs);
}
