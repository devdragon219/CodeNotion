using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NSubstitute;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.IntegrationTests.Anag.Mutations.SubjectMutations;
using RealGimm.WebCommons.Mapping;
using Autofac;
using RealGimm.Core.EventSystem;
using RealGimm.Web.Anag.Models.OrgUnit;
using RealGimm.Infrastructure;

namespace RealGimm.IntegrationTests.Anag.Mutations.OrgUnitsMutations;

public class OrgUnits : MutationTestBase
{
  private readonly IMapper _mapper;
  public OrgUnits()
  {
    _mapper = _container.Resolve<IMapper>();
  }

  [Fact]
  protected async Task Should_CreateManagementSubjectAndOrgUnits()
  {
    // Arrange
    await using var context = CreateDbContext();
    var subjectRepo = new AnagEfRepository<Subject>(context);
    var ouRepo = new AnagEfRepository<OrgUnit>(context);
    var subjMutations = new Web.Anag.Mutations.SubjectMutations();
    var ouMutations = new Web.Anag.Mutations.OrgUnitMutations();
    var subject = new ManagementSubject();
    subject.SetFullName("1b Name");
    subject.SetInternalCode("1b Code");
    subject.SetManagementCode("1b ManagementCode");
    subject.SetBaseCountryTaxIdCode("1b BaseCountryTaxIdCode");

    UpsertSubjectTestsBase<ManagementSubject>.InitializeProperties1(subject, null);

    subject.AddSelfManagementRelation();
    subject.SetAdditionalTaxIdCode("1 AdditionalTaxIdCode");
    subject.SetBaseCountryISO("1 BaseCountryISO");
    subject.SetLocation("1 Location");
    subject.UpdateBusinessData(DateOnly.FromDateTime(new DateTime(2022, 01, 01)), 10_000, "1 CompaniesHouseIdCode", "1 AdditionalGovIdCode");
    subject.UpdateGroupSignature("1 InterGroupSignature");
    subject.UpdateBankingData("1 BankingId1", "1 BankingId2");

    await subjectRepo.AddAsync(subject);

    var ouName = Guid.NewGuid().ToString();

    // Act
    var orgUnitInput = new ManagementOrgUnitInput(Core.Common.EntryStatus.Working,
      null,
      ouName,
      "OU1010",
      null,
      subject.Id,
      null,
      null,
      null,
      null);

    var result = await ouMutations.AddManagementOrgUnit(orgUnitInput,
      _mapper,
      subjectRepo,
      ouRepo);

    // Assert
    Assert.True(result.IsSuccess);
  }


  [Fact]
  protected async Task Should_KeepChildrenOrgUnitAfterClosure()
  {
    // Arrange
    await using var context = CreateDbContext();
    var subjectRepo = new AnagEfRepository<Subject>(context);
    var ouRepo = new AnagEfRepository<OrgUnit>(context);
    var subjMutations = new Web.Anag.Mutations.SubjectMutations();
    var ouMutations = new Web.Anag.Mutations.OrgUnitMutations();
    var subject = new ManagementSubject();
    subject.SetFullName("1c Name");
    subject.SetInternalCode("1c Code");
    subject.SetManagementCode("1c ManagementCode");
    subject.SetBaseCountryTaxIdCode("1c BaseCountryTaxIdCode");

    UpsertSubjectTestsBase<ManagementSubject>.InitializeProperties1(subject, null);

    subject.AddSelfManagementRelation();
    subject.SetBaseCountryISO("1 BaseCountryISO");
    subject.SetLocation("1 Location");
    subject.UpdateGroupSignature("1 InterGroupSignature");
    subject.UpdateBankingData("1 BankingId1", "1 BankingId2");

    await subjectRepo.AddAsync(subject);

    var ouName = Guid.NewGuid().ToString();
    var ouCode = Guid.NewGuid().ToString();

    // Act
    var orgUnitInput = new ManagementOrgUnitInput(Core.Common.EntryStatus.Working,
      null,
      ouName,
      ouCode,
      null,
      subject.Id,
      null,
      null,
      null,
      null);

    var result = await ouMutations.AddManagementOrgUnit(orgUnitInput,
      _mapper,
      subjectRepo,
      ouRepo);

    Assert.True(result.IsSuccess);

    var parentId = result.Value.Id;

    var childName = Guid.NewGuid().ToString();
    var childCode = Guid.NewGuid().ToString();

    var childOrgUnitInput = new ManagementOrgUnitInput(Core.Common.EntryStatus.Working,
      null,
      childName,
      childCode,
      null,
      subject.Id,
      parentId,
      null,
      null,
      null);

    result = await ouMutations.AddManagementOrgUnit(childOrgUnitInput,
      _mapper,
      subjectRepo,
      ouRepo);

    Assert.Empty(result.ValidationErrors);

    Assert.True(result.IsSuccess);

    var childId = result.Value.Id;

    // Close the parent org unit
    var updatedOrgUnit = orgUnitInput with
    {
      EntryStatus = Core.Common.EntryStatus.FrozenClosed,
      ClosureDate = DateTime.Today.AddDays(-1),
      OrgUnitId = parentId
    };

    result = await ouMutations.UpdateManagementOrgUnit(updatedOrgUnit,
      _mapper,
      subjectRepo,
      ouRepo);

    Assert.True(result.IsSuccess);

    // Assert
    var remainingOrgUnit = await ouRepo.GetByIdAsync(childId);

    Assert.NotNull(remainingOrgUnit);
    Assert.Null(remainingOrgUnit.ParentOrgUnit);
    Assert.Equal(subject.Id, remainingOrgUnit.ParentSubjectId);
  }

  protected AnagDbContext CreateDbContext()
    => new(
      CreateNewContextOptions(),
      null,
      SupportedDbDialect.InMemory,
      Substitute.For<IDomainEventDispatcher>(),
      null);

  private static DbContextOptions<AnagDbContext> CreateNewContextOptions()
  {
    var serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .BuildServiceProvider();

    var builder = new DbContextOptionsBuilder<AnagDbContext>()
      .UseInMemoryDatabase("cleanarchitecture")
      .UseInternalServiceProvider(serviceProvider);

    return builder.Options;
  }
}
