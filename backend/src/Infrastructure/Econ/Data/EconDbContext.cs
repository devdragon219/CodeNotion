using System.Reflection;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RealGimm.Core.Econ.InvoiceAggregate;
using RealGimm.Core.EventSystem;
using RealGimm.Core.Econ.TaxCreditAggregate;

namespace RealGimm.Infrastructure.Econ.Data;

public class EconDbContext : TrackableDbContext
{
  public EconDbContext(IConfiguration? configuration,
    IUserDataProvider? userDataProvider,
    IDomainEventDispatcher? dispatcher,
    EconFilterInterceptor? filterInterceptor)
    : base(configuration, CONNSTR_TENANT, userDataProvider, dispatcher)
  {
    _filterInterceptor = filterInterceptor;
  }
  public EconDbContext(DbContextOptions<EconDbContext> options,
    IUserDataProvider? userDataProvider,
    SupportedDbDialect dialectOverride,
    IDomainEventDispatcher? dispatcher,
    EconFilterInterceptor? filterInterceptor)
    : base(options, dialectOverride, userDataProvider, dispatcher)
  {
    _filterInterceptor = filterInterceptor;
  }

  protected override string MigrationTableName => "__EconMigrationHistory";
  protected override string? TableSchema => "econ";

  public DbSet<Invoice> Invoices => Set<Invoice>();
  public DbSet<TaxCredit> TaxCredits => Set<TaxCredit>();
  
  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder, typeof(EconConfigAttribute));
  }
}
