using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.IntegrationTests.Docs.Data;
using RealGimm.Web.Docs.Mapping;
using RealGimm.Web.Docs.Models;
using Xunit;

namespace RealGimm.IntegrationTests.Docs.Mutations;

[Collection(nameof(DocsTestCollection))]
public class AnagDocuments : DocsTestBase
{
  public AnagDocuments(CmisRepoFixture data) : base(data) { }

  [Fact]
  public async Task Should_CreateDocument()
  {
    // Arrange
    var testDocumentName = Guid.NewGuid().ToString();
    var testDocumentFileName = testDocumentName + ".pdf";

    var repository = _repoFixture.GetRepositoryAsync();
    var docMutations = new Web.Docs.Mutations.SubjectDocumentMutations();

    var file = new UploadFile();
    var userData = new UserDataProvider();
    userData.SetTenantId(Guid.NewGuid());

    var repo = new AnagEfRepository<Subject>(CreateAnagDbContext());

    //Create subject and management subject
    var mgmtSubj = MakeManagementSubject();
    await repo.AddAsync(mgmtSubj);

    var subj = MakeLegalSubject();
    await repo.AddAsync(subj);

    var docToCreate = new[]{new DocumentInput(null, testDocumentName,
      testDocumentFileName,
      ContentType.Image,
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
      subj.Id,
      docToCreate,
      repository,
      new SubjectDocumentMapper(repo)
      {
        UserDataProvider = userData
      },
      CancellationToken.None);

    // Assert
    Assert.True(result.IsSuccess);
  }
}
