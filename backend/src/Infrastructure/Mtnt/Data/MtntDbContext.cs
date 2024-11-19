using System.Reflection;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Mtnt.TenantAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RealGimm.Core.EventSystem;

namespace RealGimm.Infrastructure.Mtnt.Data;

public class MtntDbContext : TrackableDbContext
{
  public MtntDbContext(IConfiguration? configuration,
    IUserDataProvider? userDataProvider,
    IDomainEventDispatcher? dispatcher)
    : base(configuration, CONNSTR_DEFAULT, userDataProvider, dispatcher) { }
  public MtntDbContext(DbContextOptions<MtntDbContext> options,
    IUserDataProvider? userDataProvider,
    SupportedDbDialect dialectOverride,
    IDomainEventDispatcher? dispatcher)
    : base(options, dialectOverride, userDataProvider, dispatcher) { }

  protected override string MigrationTableName => "__MtntMigrationHistory";
  protected override string? TableSchema => null;

  public DbSet<Tenant> Tenants => Set<Tenant>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder, typeof(MtntConfigAttribute));
  }
}
