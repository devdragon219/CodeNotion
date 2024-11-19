using subAgg = RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.IntegrationTests.Docs.Data;
using Xunit;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Web.Docs.Mapping;
using RealGimm.Web.Docs.Models;
using RealGimm.Infrastructure.Asst.Data;
using RealGimm.Core.Asst.EstateUnitAggregate;

namespace RealGimm.IntegrationTests.Docs.Mutations;

[Collection(nameof(DocsTestCollection))]
public class EstateUnitDocuments : AsstDocumentTests
{
  public EstateUnitDocuments(CmisRepoFixture data) : base(data) { }

  [Fact]
  public async Task Should_CreateDocument()
  {
    var testDocumentName = Guid.NewGuid().ToString();
    var testDocumentFileName = testDocumentName + ".pdf";

    var repository = _repoFixture.GetRepositoryAsync();
    var docMutations = new Web.Docs.Mutations.EstateUnitDocumentMutations();

    var file = new UploadFile();
    var userData = new UserDataProvider();
    userData.SetTenantId(Guid.NewGuid());

    var estRepo = new AsstEfRepository<Estate>(CreateAsstDbContext());
    var unitRepo = new AsstEfRepository<EstateUnit>(CreateAsstDbContext());
    var subRepo = new AnagEfRepository<subAgg.Subject>(CreateAnagDbContext());

    var subject = MakeManagementSubject();
    await subRepo.AddAsync(subject);

    var estate = CreateEstate(1, subject.Id);
    await estRepo.AddAsync(estate);

    var estateUnit = CreateEstateUnit(1, estate);
    await unitRepo.AddAsync(estateUnit);

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

    var result = await docMutations.AddRange(
      estate.Id,
      docToCreate,
      repository,
      new EstateUnitDocumentMapper(unitRepo, subRepo)
      {
        UserDataProvider = userData
      },
      CancellationToken.None);

    Assert.True(result.IsSuccess);
  }
}
