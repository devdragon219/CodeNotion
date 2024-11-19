using System.Reflection;
using RealGimm.Core.Asst.EstateAggregate;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Asst.FloorTemplateAggregate;
using RealGimm.Core.Asst.CadastralCategoryAggregate;
using RealGimm.Core.Asst.FunctionAreaAggregate;
using RealGimm.Core.Asst.EstateUnitAggregate;
using RealGimm.Core.Asst.EstateSubUnitAggregate;
using RealGimm.Core.Asst.CadastralUnitAggregate;
using Microsoft.Extensions.Configuration;
using RealGimm.Core.Asst.CatalogueCategoryAggregate;
using RealGimm.Core.Asst.CatalogueTypeAggregate;
using RealGimm.Core.Asst.CatalogueItemAggregate;
using RealGimm.Core.EventSystem;
using RealGimm.Core.Asst.EstateUsageTypeAggregate;
using RealGimm.Core.Asst.EstateMainUsageTypeAggregate;
using RealGimm.Core.Asst.CadastralLandCategoryAggregate;
using RealGimm.Core.Asst.AssetTaxCalculationAggregate;

namespace RealGimm.Infrastructure.Asst.Data;

public class AsstDbContext : TrackableDbContext
{
  public AsstDbContext(IConfiguration? configuration,
    IUserDataProvider? userDataProvider,
    IDomainEventDispatcher? dispatcher,
    AsstFilterInterceptor? filterInterceptor)
    : base(configuration, CONNSTR_TENANT, userDataProvider, dispatcher)
  {
    _filterInterceptor = filterInterceptor;
  }
  public AsstDbContext(DbContextOptions<AsstDbContext> options,
    IUserDataProvider? userDataProvider,
    SupportedDbDialect dialectOverride,
    IDomainEventDispatcher? dispatcher,
    AsstFilterInterceptor? filterInterceptor)
    : base(options, dialectOverride, userDataProvider, dispatcher)
  {
    _filterInterceptor = filterInterceptor;
  }

  protected override string MigrationTableName => "__AsstMigrationHistory";
  protected override string? TableSchema => "asst";

  public DbSet<Estate> Estates => Set<Estate>();
  public DbSet<FloorTemplate> FloorTemplates => Set<FloorTemplate>();
  public DbSet<EstateUnit> EstateUnits => Set<EstateUnit>();
  public DbSet<EstateSubUnit> EstateSubUnits => Set<EstateSubUnit>();
  public DbSet<CadastralUnit> CadastralUnits => Set<CadastralUnit>();
  public DbSet<CadastralCategory> CadastralCategories => Set<CadastralCategory>();
  public DbSet<AssetTaxCalculation> AssetTaxCalculations => Set<AssetTaxCalculation>();
  public DbSet<FunctionArea> FunctionArea => Set<FunctionArea>();
  public DbSet<CatalogueCategory> CatalogueCategories => Set<CatalogueCategory>();
  public DbSet<CatalogueType> CatalogueTypes => Set<CatalogueType>();
  public DbSet<CatalogueItem> CatalogueItems => Set<CatalogueItem>();  
  public DbSet<EstateUsageType> EstateUsageTypes => Set<EstateUsageType>();
  public DbSet<EstateMainUsageType> EstateMainUsageTypes => Set<EstateMainUsageType>();
  public DbSet<CadastralLandCategory> CadastralLandCategories => Set<CadastralLandCategory>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder, typeof(AsstConfigAttribute));
    
    modelBuilder.Entity<CadastralUnit>(builder =>
    {
      if (Database.IsInMemory())
      {
        builder.Property(p => p.HistoryTags)
              .HasConversion(
                  v => v == null ? null : string.Join(",", v),
                  v => string.IsNullOrEmpty(v)
                    ? Array.Empty<Guid>()
                    : v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(e => Guid.Parse(e)).ToArray());
      }
    });

    modelBuilder.Entity<EstateUnit>(builder =>
    {
      if (Database.IsInMemory())
      {
        builder.Property(p => p.HistoryTags)
              .HasConversion(
                  v => v == null ? null : string.Join(",", v),
                  v => string.IsNullOrEmpty(v)
                    ? Array.Empty<Guid>()
                    : v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(e => Guid.Parse(e)).ToArray());
      }
    });

    modelBuilder.Entity<Refactoring>(builder =>
    {
      if (Database.IsInMemory())
      {
        builder.Property(p => p.EstateUnitIds)
              .HasConversion(
                  v => v == null ? null : string.Join(",", v),
                  v => string.IsNullOrEmpty(v)
                    ? Array.Empty<int>()
                    : v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(e => Convert.ToInt32(e)).ToArray());
      }
    });

    modelBuilder.Entity<AssetTaxPayment>(builder =>
    {
      if (Database.IsInMemory())
      {
        builder.Property(p => p.InstallmentsPaid)
              .HasConversion(
                  v => v == null ? null : string.Join(",", v),
                  v => string.IsNullOrEmpty(v)
                    ? Array.Empty<int>()
                    : v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(e => Convert.ToInt32(e)).ToArray());
      }
    });
  }
}
