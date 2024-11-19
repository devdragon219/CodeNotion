using System.Reflection;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RealGimm.Core.EventSystem;
using RealGimm.Core.Nrgy.UtilityTypeAggregate;
using RealGimm.Core.Nrgy.UtilityServiceAggregate;
using RealGimm.Core.Nrgy.CostChargeAggregate;
using RealGimm.Core.Nrgy.ReadingAggregate;

namespace RealGimm.Infrastructure.Nrgy.Data;

public class NrgyDbContext : TrackableDbContext
{
  public NrgyDbContext(IConfiguration? configuration,
    IUserDataProvider? userDataProvider,
    IDomainEventDispatcher? dispatcher,
    NrgyFilterInterceptor? filterInterceptor)
    : base(configuration, CONNSTR_TENANT, userDataProvider, dispatcher)
  {
    _filterInterceptor = filterInterceptor;
  }
  public NrgyDbContext(DbContextOptions<NrgyDbContext> options,
    IUserDataProvider? userDataProvider,
    SupportedDbDialect dialectOverride,
    IDomainEventDispatcher? dispatcher,
    NrgyFilterInterceptor? filterInterceptor)
    : base(options, dialectOverride, userDataProvider, dispatcher)
  {
    _filterInterceptor = filterInterceptor;
  }

  protected override string MigrationTableName => "__NrgyMigrationHistory";
  protected override string? TableSchema => "nrgy";

  public DbSet<UtilityType> UtilityTypes => Set<UtilityType>();
  public DbSet<UtilityService> UtilityServices => Set<UtilityService>();
  public DbSet<Reading> Readings => Set<Reading>();
  public DbSet<CostCharge> CostCharges => Set<CostCharge>();
  
  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    OnModelCreating(modelBuilder, typeof(NrgyConfigAttribute));
  }
}
