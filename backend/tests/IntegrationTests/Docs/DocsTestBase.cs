using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NSubstitute;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.EventSystem;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Anag.Data;
using RealGimm.Infrastructure.Asst.Data;
using RealGimm.IntegrationTests.Docs.Data;

namespace RealGimm.IntegrationTests.Docs;

public class DocsTestBase
{
  protected readonly CmisRepoFixture _repoFixture;

  public DocsTestBase(CmisRepoFixture data)
  {
    _repoFixture = data;
  }

  protected ManagementSubject MakeManagementSubject()
  {
    var subj = new ManagementSubject();

    subj.SetFullName(Guid.NewGuid().ToString());
    subj.SetInternalCode(Guid.NewGuid().ToString());

    return subj;
  }
  
  protected LegalSubject MakeLegalSubject()
  {
    var subj = new LegalSubject();

    subj.SetFullName(Guid.NewGuid().ToString());
    subj.SetInternalCode(Guid.NewGuid().ToString());

    return subj;
  }

  protected AnagDbContext CreateAnagDbContext()
    => new(
      CreateNewContextOptions<AnagDbContext>(),
      null,
      SupportedDbDialect.InMemory,
      Substitute.For<IDomainEventDispatcher>(),
      null);

  protected AsstDbContext CreateAsstDbContext()
    => new(
      CreateNewContextOptions<AsstDbContext>(),
      null,
      SupportedDbDialect.InMemory,
      Substitute.For<IDomainEventDispatcher>(),
      null);

  private static DbContextOptions<T> CreateNewContextOptions<T>() where T : TrackableDbContext
  {
    var serviceProvider = new ServiceCollection()
        .AddEntityFrameworkInMemoryDatabase()
        .BuildServiceProvider();

    var builder = new DbContextOptionsBuilder<T>()
      .UseInMemoryDatabase("cleanarchitecture")
      .UseInternalServiceProvider(serviceProvider);

    return builder.Options;
  }
}
