using System.Reflection;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RealGimm.Core.EventSystem;
using RealGimm.Core.Fclt.ContractAggregate;
using RealGimm.Core.Fclt.ContractTemplateAggregate;
using RealGimm.Core.Fclt.SLAAggregate;
using RealGimm.Core.Fclt.EstateUnitGroupAggregate;
using RealGimm.Core.Fclt.ContractTypeAggregate;
using RealGimm.Core.Fclt.InterventionTypeAggregate;
using RealGimm.Core.Fclt.CraftAggregate;
using RealGimm.Core.Fclt.TicketTypeAggregate;
using RealGimm.Core.Fclt.TicketAggregate;
using RealGimm.Core.Fclt.WorkTeamAggregate;
using RealGimm.Core.Fclt.QualificationLevelAggregate;
using RealGimm.Core.Fclt.CalendarAggregate;
using RealGimm.Core.Fclt.PenaltyAggregate;
using RealGimm.Core.Fclt.TicketChecklistTemplateAggregate;
using RealGimm.Core.Fclt.PriceListMeasurementUnitAggregate;
using RealGimm.Core.Fclt.PriceListAggregate;
using RealGimm.Core.Fclt.PriceListArticleAggregate;
using RealGimm.Core.Fclt.TicketChecklistAggregate;
using RealGimm.Core.Fclt.ServiceCategoryAggregate;
using RealGimm.Core.Fclt.ServiceAggregate;

namespace RealGimm.Infrastructure.Fclt.Data;

public class FcltDbContext : TrackableDbContext
{
  public FcltDbContext(IConfiguration? configuration,
    IUserDataProvider? userDataProvider,
    IDomainEventDispatcher? dispatcher,
    FcltFilterInterceptor? filterInterceptor)
    : base(configuration, CONNSTR_TENANT, userDataProvider, dispatcher)
  {
    _filterInterceptor = filterInterceptor;
  }
  public FcltDbContext(DbContextOptions<FcltDbContext> options,
    IUserDataProvider? userDataProvider,
    SupportedDbDialect dialectOverride,
    IDomainEventDispatcher? dispatcher,
    FcltFilterInterceptor? filterInterceptor)
    : base(options, dialectOverride, userDataProvider, dispatcher)
  {
    _filterInterceptor = filterInterceptor;
  }

  protected override string MigrationTableName => "__FcltMigrationHistory";
  protected override string? TableSchema => "fclt";

  public DbSet<Contract> Contracts => Set<Contract>();
  public DbSet<ContractTemplate> ContractTemplates => Set<ContractTemplate>();
  public DbSet<ContractType> ContractTypes => Set<ContractType>();
  public DbSet<EstateUnitGroup> EstateUnitGroups => Set<EstateUnitGroup>();
  public DbSet<SLA> SLAs => Set<SLA>();
  public DbSet<Craft> Crafts => Set<Craft>();
  public DbSet<InterventionType> InterventionTypes => Set<InterventionType>();
  public DbSet<TicketType> TicketTypes => Set<TicketType>();
  public DbSet<WorkTeam> WorkTeams => Set<WorkTeam>();
  public DbSet<QualificationLevel> QualificationLevels => Set<QualificationLevel>();
  public DbSet<Calendar> Calendars => Set<Calendar>();
  public DbSet<Penalty> Penalties => Set<Penalty>();
  public DbSet<Ticket> Tickets => Set<Ticket>();
  public DbSet<TicketChecklistTemplate> TicketChecklistTemplates => Set<TicketChecklistTemplate>();
  public DbSet<TicketChecklist> TicketChecklists => Set<TicketChecklist>();
  public DbSet<PriceListMeasurementUnit> PriceListMeasurementUnits => Set<PriceListMeasurementUnit>();
  public DbSet<PriceList> PriceLists => Set<PriceList>();
  public DbSet<PriceListArticle> PriceListArticles => Set<PriceListArticle>();
  public DbSet<ServiceCategory> ServiceCategories => Set<ServiceCategory>();
  public DbSet<Service> Services => Set<Service>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    OnModelCreating(modelBuilder, typeof(FcltConfigAttribute));
  }
}
