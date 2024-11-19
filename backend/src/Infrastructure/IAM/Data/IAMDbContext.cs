using System.Reflection;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Core.IAM.UserAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RealGimm.Core.EventSystem;

namespace RealGimm.Infrastructure.IAM.Data;

public class IAMDbContext : TrackableDbContext
{
  public IAMDbContext(IConfiguration? configuration,
    IUserDataProvider? userDataProvider,
    IDomainEventDispatcher? dispatcher,
    Guid? tenant = null)
    : base(configuration, CONNSTR_TENANT, userDataProvider, dispatcher, tenant) { }
  public IAMDbContext(DbContextOptions<IAMDbContext> options,
    IUserDataProvider? userDataProvider,
    SupportedDbDialect dialectOverride,
    IDomainEventDispatcher? dispatcher)
    : base(options, dialectOverride, userDataProvider, dispatcher) { }

  protected override string MigrationTableName => "__IAMMigrationHistory";
  protected override string? TableSchema => "iam";

  public DbSet<User> Users => Set<User>();
  public DbSet<Group> Groups => Set<Group>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    OnModelCreating(modelBuilder, typeof(IAMConfigAttribute));
    
    modelBuilder.Entity<User>(builder =>
    {
      if (Database.IsInMemory())
      {
        builder.Property(p => p.OrgUnits)
              .HasConversion(
                  v => v == null ? null : string.Join(",", v),
                  v => v == null ? null : v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(e => Convert.ToInt32(e)).ToArray());
        builder.Property(p => p.Subjects)
              .HasConversion(
                  v => v == null ? null : string.Join(",", v),
                  v => v == null ? null : v.Split(',', StringSplitOptions.RemoveEmptyEntries).Select(e => Convert.ToInt32(e)).ToArray());
      }
    });
  }
}
