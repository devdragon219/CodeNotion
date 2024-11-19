using subAgg = RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.IntegrationTests.Docs.Data;
using Xunit;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Web.Docs.Mapping;
using RealGimm.Web.Docs.Models;
using RealGimm.Infrastructure.Asst.Data;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Infrastructure.Asst.Data.Fakers;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;

namespace RealGimm.IntegrationTests.Docs.Mutations;

[Collection(nameof(DocsTestCollection))]
public class CatalogueItemDocuments : AsstDocumentTests
{
  public CatalogueItemDocuments(CmisRepoFixture data) : base(data) { }

  [Fact]
  public async Task Should_CreateDocument()
  {
    var testDocumentName = Guid.NewGuid().ToString();
    var testDocumentFileName = testDocumentName + ".pdf";

    var repository = _repoFixture.GetRepositoryAsync();
    var docMutations = new Web.Docs.Mutations.CatalogueItemDocumentMutations();

    var file = new UploadFile();
    var userData = new UserDataProvider();
    userData.SetTenantId(Guid.NewGuid());

    var subRepo = new AnagEfRepository<subAgg.Subject>(CreateAnagDbContext());
    var estRepo = new AsstEfRepository<Estate>(CreateAsstDbContext());
    var itemRepo = new AsstEfRepository<CatalogueItem>(CreateAsstDbContext());
    var itemTypeRepo = new AsstEfRepository<CatalogueType>(CreateAsstDbContext());
    var usageTypeRepo = new AsstEfRepository<EstateUsageType>(CreateAsstDbContext());

    var subject = MakeManagementSubject();
    await subRepo.AddAsync(subject);

    var estate = CreateEstate(1, subject.Id);
    await estRepo.AddAsync(estate);

    var estateUsageTypes = new EstateUsageTypeFaker().Generate(10);
    await usageTypeRepo.AddRangeAsync(estateUsageTypes);

    var type = new CatalogueTypeFaker()
      .UseCategories(new CatalogueCategoryFaker().Generate())
      .UseEstateUsageTypes(estateUsageTypes)
      .Generate();
    await itemTypeRepo.AddAsync(type);

    var catalogueItem = new CatalogueItemFaker().UseEstates(estate).UseTypes(type);
    var addedCatalogueItem = await itemRepo.AddAsync(catalogueItem);

    var docToCreate = new[]{new DocumentInput(null, testDocumentName,
      testDocumentFileName,
      ContentType.Paper,
      ContentCategory.BldAdminGeneric,
      Since: DateTime.UtcNow,
      null,
      null,
      Issuer: Guid.NewGuid().ToString(),
      null,
      IssueDate: DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-1)),
      ProtocolNumber: Guid.NewGuid().ToString(),
      file,
      "Sample notes")
    };

    // Act
    var result = await docMutations.AddRange(
      addedCatalogueItem.Id,
      docToCreate,
      repository,
      new CatalogueItemDocumentMapper(itemRepo)
      {
        UserDataProvider = userData
      },
      CancellationToken.None);

    // Assert
    Assert.True(result.IsSuccess);
  }
}
