using System.Reflection;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Anag.OrgUnitAggregate;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Anag.SubjectCategoryAggregate;
using Microsoft.Extensions.Configuration;
using RealGimm.Core.EventSystem;

namespace RealGimm.Infrastructure.Anag.Data;

public class AnagDbContext : TrackableDbContext
{
  public AnagDbContext(IConfiguration? configuration,
    IUserDataProvider? userDataProvider,
    IDomainEventDispatcher? dispatcher,
    AnagFilterInterceptor? filterInterceptor)
    : base(configuration, CONNSTR_TENANT, userDataProvider, dispatcher)
  {
    _filterInterceptor = filterInterceptor;
  }
  public AnagDbContext(DbContextOptions<AnagDbContext> options,
    IUserDataProvider? userDataProvider,
    SupportedDbDialect dialectOverride,
    IDomainEventDispatcher? dispatcher,
    AnagFilterInterceptor? filterInterceptor)
    : base(options, dialectOverride, userDataProvider, dispatcher)
  {
    _filterInterceptor = filterInterceptor;
  }

  protected override string MigrationTableName => "__AnagMigrationHistory";
  protected override string? TableSchema => "anag";

  public DbSet<Subject> Subjects => Set<Subject>();
  public DbSet<SubjectCategory> SubjectCategories => Set<SubjectCategory>();
  public DbSet<OrgUnit> OrgUnit => Set<OrgUnit>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder, typeof(AnagConfigAttribute));

    modelBuilder.Entity<OrgUnit>(builder =>
    {
      if (Database.IsInMemory())
      {
        builder.Property(p => p.GeographicalCities)
              .HasConversion(
                  v => v == null ? null : string.Join(",", v),
                  v => v == null ? null : v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(e => Convert.ToInt32(e)).ToArray());
      }
    });
  }
}
