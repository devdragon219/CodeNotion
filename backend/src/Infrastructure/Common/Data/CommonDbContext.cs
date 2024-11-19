using System.Reflection;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Common.CustomCodeAggregate;
using RealGimm.Core.Common.CityAggregate;
using RealGimm.Core.Common.AuditLogAggregate;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Common.OfficialActAggregate;
using Microsoft.Extensions.Configuration;
using RealGimm.Core.Common.AccountingItemAggregate;
using RealGimm.Core.Common.InterestRateAggregate;
using RealGimm.Core.Common.RevaluationDataAggregate;
using RealGimm.Core.Common.VATRateAggregate;
using RealGimm.Core.EventSystem;
using RealGimm.Core.Common.NotificationAggregate;
using RealGimm.Core.Common.TaxConfigAggregate;
using RealGimm.Core.Common.CostCentreAggregate;

namespace RealGimm.Infrastructure.Common.Data;

public class CommonDbContext : TrackableDbContext
{
  public CommonDbContext(IConfiguration? configuration,
    IUserDataProvider? userDataProvider,
    IDomainEventDispatcher? dispatcher,
    CommonFilterInterceptor? filterInterceptor,
    Guid? tenant = null)
    : base(configuration, CONNSTR_TENANT, userDataProvider, dispatcher, tenant)
  {
    _filterInterceptor = filterInterceptor;
  }
  public CommonDbContext(DbContextOptions<CommonDbContext> options,
    IUserDataProvider? userDataProvider,
    SupportedDbDialect dialectOverride,
    IDomainEventDispatcher? dispatcher,
    CommonFilterInterceptor? filterInterceptor)
    : base(options, dialectOverride, userDataProvider, dispatcher)
  {
    _filterInterceptor = filterInterceptor;
  }

  protected override string MigrationTableName => "__CommonMigrationHistory";
  protected override string? TableSchema => "common";

  public DbSet<CustomCode> CustomCodes => Set<CustomCode>();
  public DbSet<Core.Common.ConfigAggregate.Config> Config => Set<Core.Common.ConfigAggregate.Config>();
  public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
  public DbSet<City> Cities => Set<City>();
  public DbSet<OfficialAct> OfficialActs => Set<OfficialAct>();
  public DbSet<AccountingItem> AccountingItems => Set<AccountingItem>();
  public DbSet<InterestRate> InterestRates => Set<InterestRate>();
  public DbSet<RevaluationData> RevaluationData => Set<RevaluationData>();
  public DbSet<VATRate> VATRates => Set<VATRate>();
  public DbSet<Notification> Notifications => Set<Notification>();
  public DbSet<TaxConfig> TaxConfigs => Set<TaxConfig>();
  public DbSet<CostCentre> CostCentres => Set<CostCentre>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder, typeof(CommonConfigAttribute));
  }
}
