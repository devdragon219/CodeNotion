using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Docs.DocumentAggregate;
using RealGimm.Core.Docs.DocumentAggregate.Specifications;
using Xunit;

namespace RealGimm.IntegrationTests.Docs.Data;

[Collection(nameof(DocsTestCollection))]
public class CmisRepository : DocsTestBase
{
  public CmisRepository(CmisRepoFixture data) : base(data) { }

  [Fact]
  public async Task AddsDocument()
  {
    var testDocumentName = "testDocument";
    var testDocumentFileName = "testDocument.pdf";
    var testProtocol = "CV504FP";
    var testDate = new DateOnly(2021, 12, 7);
    var testUser = "adminUser@example.com";
    var testNotes = Guid.NewGuid().ToString();

    var repository = _repoFixture.GetRepositoryAsync();
    var doc = new Document();
    doc.SetBaseData(testDocumentName,
      testDocumentFileName,
      ContentType.Image,
      ContentCategory.BldAdminOwnership,
      testUser,
      doc.CreationDate);

    var memStream = new MemoryStream(new byte[] { 0xFF, 0xAA, 0xBE, 0xEF });
    doc.SetStream(memStream,
      memStream.Length,
      "application/octet-stream");

    doc.SetProtocol(testProtocol);

    doc.SetIssuer("Comune di Comune", "COM-COM", testDate);

    doc.SetOwnership<LegalSubject>(
      new[] { 30, 31 },
      77,
      null);

    doc.SetNotes(testNotes);

    doc.SetValidity(DateTime.Now.AddYears(-1), DateTime.Now.AddYears(1));

    await repository.AddAsync(doc);

    var newDocument = await repository.GetByIdAsync(doc.CmisId);

    Assert.Equal(testDocumentName, newDocument?.Name);
    Assert.Equal(testDocumentFileName, newDocument?.FileName);
    Assert.Equal(testProtocol, newDocument?.ProtocolNumber);
    Assert.Equal(testUser, newDocument?.UploaderName);
    Assert.Equal(testNotes, newDocument?.Notes);
    Assert.False(string.IsNullOrEmpty(newDocument?.CmisId));
  }

  [Fact]
  public async Task RetrievesDocuments()
  {
    var testDocumentName = "testDocument6";
    var testDocumentFileName = "testDocument6.pdf";
    var testProtocol = "CV504FP";
    var testUser = "admin@example.com";
    var testDate = new DateOnly(2021, 12, 7);

    var repository = _repoFixture.GetRepositoryAsync();
    var doc = new Document();
    doc.SetBaseData(testDocumentName,
      testDocumentFileName,
      ContentType.Image,
      ContentCategory.BldAdminOwnership,
      testUser,
      doc.CreationDate);

    var memStream = new MemoryStream(new byte[] { 0xFF, 0xAA, 0xBE, 0xEF });
    doc.SetStream(memStream,
      memStream.Length,
      "application/octet-stream");

    doc.SetProtocol(testProtocol);

    doc.SetIssuer("Comune di Comune", "COM-COM", testDate);

    doc.SetOwnership<LegalSubject>(new[] { 30, 31 }, 7, null);

    var expectedOwner = Document.MakeOwnerId<LegalSubject>(7);

    doc.SetValidity(DateTime.Now.AddYears(-1), DateTime.Now.AddYears(1));

    await repository.AddAsync(doc);

    var result = repository.AsQueryable(new DocumentsByEntityIdSpec<LegalSubject>(7))
      .Where(d => d.ContentCategory == ContentCategory.BldAdminOwnership)
      .OrderBy(d => d.Name)
      .ToList();

    Assert.NotEmpty(result);
    Assert.Collection(result, d =>
    {
      Assert.Equal(expectedOwner, d.EntityId);
      Assert.Equal(testDocumentName, d.Name);
      Assert.Equal(testUser, d.UploaderName);
      Assert.NotEqual(string.Empty, d.CmisId);
      Assert.Collection(d.ManagementSubjectIds,
        a1 => Assert.Equal("30", a1),
        a2 => Assert.Equal("31", a2)
      );
    });
  }

  [Fact]
  public async Task AddsDocumentsByOwner()
  {
    var testDocumentName = "testDocument2";
    var testDocumentFileName = "testDocument2.pdf";
    var testProtocol = "CV504FP2";
    var testUser = "admin2@example.com";
    var testDate = new DateOnly(2021, 12, 7);

    var repository = _repoFixture.GetRepositoryAsync();
    var doc = new Document();
    doc.SetBaseData(testDocumentName,
      testDocumentFileName,
      ContentType.Video,
      ContentCategory.Generic,
      testUser,
      doc.CreationDate);

    var memStream = new MemoryStream(new byte[] { 0xFF, 0xA1, 0xBE, 0xEF });
    doc.SetStream(memStream,
      memStream.Length,
      "application/octet-stream");

    doc.SetProtocol(testProtocol);

    doc.SetIssuer("Comune di Comune", "COM-COM", testDate);

    doc.SetOwnership<LegalSubject>(new[] { 30, 31 }, 87, null);

    var expectedOwner = Document.MakeOwnerId<LegalSubject>(87);

    doc.SetValidity(DateTime.Now.AddYears(-1), DateTime.Now.AddYears(1));

    await repository.AddAsync(doc);

    var testDocumentName2 = "testDocument3";
    var testDocumentFileName2 = "testDocument3.pdf";
    var testProtocol2 = "CV504FP3";

    var doc2 = doc = new Document();
    doc2.SetBaseData(testDocumentName2,
      testDocumentFileName2,
      ContentType.Image,
      ContentCategory.BldAdminCadastre,
      testUser,
      doc2.CreationDate);

    var memStream2 = new MemoryStream(new byte[] { 0xFF, 0xA2, 0xBE, 0xEF });
    doc2.SetStream(memStream2,
      memStream2.Length,
      "application/octet-stream");

    doc2.SetProtocol(testProtocol2);

    doc2.SetIssuer("Provincia di Provincia", "PR-PR", testDate);

    doc.SetOwnership<LegalSubject>(new[] { 30, 31 }, 87, null);

    var expectedOwner2 = Document.MakeOwnerId<LegalSubject>(87);

    doc2.SetValidity(DateTime.Now.AddYears(-1), DateTime.Now.AddYears(1));

    await repository.AddAsync(doc2);

    var allDocuments = (await repository.ListAsync(new DocumentsByEntityIdSpec<LegalSubject>(87)))
      .GroupBy(d => d.CmisId)
      .Select(grp => grp.First())
      .OrderBy(d => d.Name);

    Assert.NotEmpty(allDocuments);

    Assert.Collection(allDocuments,
      d1 =>
      {
        Assert.Equal(testDocumentName, d1?.Name);
        Assert.Equal(testProtocol, d1?.ProtocolNumber);
        Assert.Equal(expectedOwner, d1?.EntityId);
        Assert.False(string.IsNullOrEmpty(d1?.CmisId));
      },
      d2 =>
      {
        Assert.Equal(testDocumentName2, d2?.Name);
        Assert.Equal(testProtocol2, d2?.ProtocolNumber);
        Assert.Equal(expectedOwner2, d2?.EntityId);
        Assert.False(string.IsNullOrEmpty(d2?.CmisId));
      });

    //Check contents
    var d1 = allDocuments.First();
    var bytes = new byte[4];
    Assert.Equal(4, d1!.Data!.Read(bytes));
    Assert.Collection(bytes, b =>
      {
        Assert.Equal(0xFF, b);
      },
      b =>
      {
        Assert.Equal(0xA1, b);
      },
      b =>
      {
        Assert.Equal(0xBE, b);
      },
      b =>
      {
        Assert.Equal(0xEF, b);
      });

    var d2 = allDocuments.Last();

    Assert.Equal(4, d2!.Data!.Read(bytes));
    Assert.Collection(bytes, b =>
      {
        Assert.Equal(0xFF, b);
      },
      b =>
      {
        Assert.Equal(0xA2, b);
      },
      b =>
      {
        Assert.Equal(0xBE, b);
      },
      b =>
      {
        Assert.Equal(0xEF, b);
      });
  }
}
