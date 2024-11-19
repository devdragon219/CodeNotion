using System.Reflection;
using RealGimm.Core.Prop.ContractAggregate;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RealGimm.Core.Prop.BillAggregate;
using RealGimm.Core.Prop.ContractTypeAggregate;
using RealGimm.Core.Prop.RegistrationPaymentAggregate;
using RealGimm.Core.Prop.RegistrationOfficeAggregate;
using RealGimm.Core.Prop.AdministrationAggregate;
using RealGimm.Infrastructure.Prop.Data.Config;
using RealGimm.Core.EventSystem;
using RealGimm.Core.Prop.AdministrationTermAggregate;
using RealGimm.Core.Prop.RegistryCommunicationAggregate;
using RealGimm.Core.Prop.BillItemTypeAggregate;

namespace RealGimm.Infrastructure.Prop.Data;

public class PropDbContext : TrackableDbContext
{
  public PropDbContext(IConfiguration? configuration,
    IUserDataProvider? userDataProvider,
    IDomainEventDispatcher? dispatcher,
    PropFilterInterceptor? filterInterceptor)
    : base(configuration, CONNSTR_TENANT, userDataProvider, dispatcher)
  {
    _filterInterceptor = filterInterceptor;
  }
  public PropDbContext(DbContextOptions<PropDbContext> options,
    IUserDataProvider? userDataProvider,
    SupportedDbDialect dialectOverride,
    IDomainEventDispatcher? dispatcher,
    PropFilterInterceptor? filterInterceptor)
    : base(options, dialectOverride, userDataProvider, dispatcher)
  {
    _filterInterceptor = filterInterceptor;
  }

  protected override string MigrationTableName => "__PropMigrationHistory";
  protected override string? TableSchema => "prop";

  public DbSet<BillItemType> BillItemTypes => Set<BillItemType>();
  public DbSet<Contract> Contracts => Set<Contract>();
  public DbSet<Bill> Bills => Set<Bill>();
  public DbSet<ContractType> ContractTypes => Set<ContractType>();
  public DbSet<RegistrationPayment> RegistrationPayments => Set<RegistrationPayment>();
  public DbSet<RegistrationOffice> RegistrationOffices => Set<RegistrationOffice>();
  public DbSet<Administration> Administrations => Set<Administration>();
  public DbSet<AdministrationTerm> AdministrationTerms => Set<AdministrationTerm>();
  public DbSet<RegistryCommunication> RegistryCommunications => Set<RegistryCommunication>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    OnModelCreating(modelBuilder, typeof(PropConfigAttribute));

    //Due to owned-entity configuration restrictions, this must be called manually
    new ContractConfiguration(Database.IsInMemory())
      .Configure(modelBuilder.Entity<Contract>());
  }
}
