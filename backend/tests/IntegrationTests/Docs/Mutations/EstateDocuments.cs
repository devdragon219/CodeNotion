using subAgg = RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.IntegrationTests.Docs.Data;
using Xunit;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Web.Docs.Mapping;
using RealGimm.Web.Docs.Models;
using RealGimm.Infrastructure.Asst.Data;

namespace RealGimm.IntegrationTests.Docs.Mutations;

[Collection(nameof(DocsTestCollection))]
public class EstateDocuments : AsstDocumentTests
{
  public EstateDocuments(CmisRepoFixture data) : base(data) { }

  [Fact]
  public async Task Should_CreateDocument()
  {
    var testDocumentName = Guid.NewGuid().ToString();
    var testDocumentFileName = testDocumentName + ".pdf";

    var repository = _repoFixture.GetRepositoryAsync();
    var docMutations = new Web.Docs.Mutations.EstateDocumentMutations();

    var file = new UploadFile();
    var userData = new UserDataProvider();
    userData.SetTenantId(Guid.NewGuid());

    var subRepo = new AnagEfRepository<subAgg.Subject>(CreateAnagDbContext());
    var estRepo = new AsstEfRepository<Estate>(CreateAsstDbContext());

    var subject = MakeManagementSubject();
    await subRepo.AddAsync(subject);

    var estate = CreateEstate(1, subject.Id);
    await estRepo.AddAsync(estate);

    var docToCreate = new[]{new DocumentInput(null, testDocumentName,
      testDocumentFileName,
      ContentType.Paper,
      ContentCategory.BldPlan,
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
      estate.Id,
      docToCreate,
      repository,
      new EstateDocumentMapper(estRepo)
      {
        UserDataProvider = userData
      },
      CancellationToken.None);

    // Assert
    Assert.True(result.IsSuccess);
  }
}
