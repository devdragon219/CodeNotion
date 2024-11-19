using RealGimm.SharedKernel.Interfaces;
using Microsoft.EntityFrameworkCore;
using RealGimm.Infrastructure.Interceptors;
using Microsoft.Extensions.Configuration;
using RealGimm.Core.EventSystem;
using RealGimm.Core;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure;
using System.Reflection;
using System.Runtime.Loader;

namespace RealGimm.Infrastructure;

public abstract class TrackableDbContext : Audit.EntityFramework.AuditDbContext
{
  private readonly Guid? _tenant;

  static TrackableDbContext()
  {
    Audit.Core.Configuration.JsonSettings.Converters.Add(new PointJsonConverter());
  }

  private static Assembly? _migrationAssembly;

  protected readonly IDomainEventDispatcher? _dispatcher;
  protected AccessFilterInterceptor? _filterInterceptor;
  protected readonly string _connectionString;

  protected abstract string MigrationTableName { get; }
  protected abstract string? TableSchema { get; }

  public IUserDataProvider? UserDataProvider { get; }
  public Guid? Tenant => _tenant ?? UserDataProvider?.TenantId;

  public SupportedDbDialect Dialect { get; private set; }

  public static readonly string TENANT_PLCHLDR = "{TENANT}";
  public static readonly string CONNSTR_TENANT = "TenantConnection";
  public static readonly string CONNSTR_DEFAULT = "DefaultConnection";
  public static readonly string CONFIGURATION_DB_PROVIDER = "DatabaseProvider";
  public const string UNACCENT = "rg_unaccent";

  public TrackableDbContext(
    IConfiguration? configuration,
    string connectionString,
    IUserDataProvider? userDataProvider,
    IDomainEventDispatcher? dispatcher,
    Guid? tenant = null)
  {
    _dispatcher = dispatcher;
    _tenant = tenant;
    UserDataProvider = userDataProvider;

    _connectionString = configuration is null
      ? connectionString
      : configuration.GetConnectionString(connectionString) ?? string.Empty;

    var dbProvider = configuration?[CONFIGURATION_DB_PROVIDER] ?? string.Empty;

    Dialect = string.IsNullOrEmpty(dbProvider)
      ? SupportedDbDialect.InMemory
      : Enum.Parse<SupportedDbDialect>(dbProvider);
  }

  public TrackableDbContext(DbContextOptions options,
    SupportedDbDialect dialect,
    IUserDataProvider? userDataProvider,
    IDomainEventDispatcher? dispatcher)
    : base(options)
  {
    _connectionString = string.Empty;
    _dispatcher = dispatcher;
    UserDataProvider = userDataProvider;
    Dialect = dialect;
  }

  public static string MakeDbName(Guid? tenantId)
  {
    return (tenantId ?? Guid.Empty).ToString("N");
  }

  protected void OnModelCreating(ModelBuilder modelBuilder, Type filterAttribute)
  {
    modelBuilder.HasDefaultSchema(TableSchema);

    base.OnModelCreating(modelBuilder);

    var configTypes = Assembly.GetExecutingAssembly()
        .GetTypes()
        .Where(t => t.IsClass
            && !t.IsAbstract
            && t.IsDefined(filterAttribute, false)
            && t.GetInterfaces().Any(i =>
                i.IsGenericType
                && i.GetGenericTypeDefinition() == typeof(IEntityTypeConfiguration<>)));

    foreach (var configType in configTypes)
    {
      // Create an instance of the configuration class
      var configInstance = Activator.CreateInstance(configType)
        ?? throw new InvalidOperationException($"Could not create instance of {configType.FullName}");

      // If the configuration class implements IProviderConfiguration, set the provider
      if (configInstance is IDatabaseDependentConfiguration providerConfig)
      {
        providerConfig.DbDialect = Dialect;
      }

      ApplyConfiguration(modelBuilder, configInstance);
    }
  }

  private static void ApplyConfiguration(ModelBuilder modelBuilder, object configInstance)
  {
    var applyConfigMethod = typeof(ModelBuilder)
        .GetMethods()
        .First(m => m.Name == nameof(ModelBuilder.ApplyConfiguration)
            && m.GetParameters().Length == 1);

    var entityTypeConfigInterface = configInstance.GetType()
        .GetInterfaces()
        .First(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IEntityTypeConfiguration<>));

    var entityType = entityTypeConfigInterface.GetGenericArguments()[0];

    var genericMethod = applyConfigMethod.MakeGenericMethod(entityType);

    genericMethod.Invoke(modelBuilder, [configInstance]);
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    throw new InvalidOperationException("Use OnModelCreating(ModelBuilder, Type)");
  }

  protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
  {
    base.ConfigureConventions(configurationBuilder);

    configurationBuilder.Properties<decimal>()
      .HavePrecision(18, 6);
  }

  protected override void OnConfiguring(DbContextOptionsBuilder options)
  {
    options.AddInterceptors(new KeyOrderingExpressionInterceptor());

    var isPerTenantDb = _connectionString.Contains(TENANT_PLCHLDR, StringComparison.InvariantCultureIgnoreCase);
    if (isPerTenantDb && !Tenant.HasValue)
    {
      throw new InvalidOperationException("A connection to a tenant-based DB has been attempted, but no tenant was specified.");
    }

    var usableConnectionString = isPerTenantDb
      ? _connectionString.Replace(
          TENANT_PLCHLDR,
          MakeDbName(Tenant),
          StringComparison.InvariantCultureIgnoreCase)
      : _connectionString;

    if (Dialect == SupportedDbDialect.InMemory)
    {
      options.UseInMemoryDatabase(
        string.IsNullOrEmpty(usableConnectionString)
          ? Guid.NewGuid().ToString()
          : usableConnectionString,
        x => x.EnableNullChecks());
    }
    else if (Dialect == SupportedDbDialect.PostgreSQL)
    {
      _migrationAssembly ??= LoadMigrationAssembly("RealGimm.Infra.PgSql.dll");

      options.UseNpgsql(usableConnectionString, options =>
      {
        options
          .MigrationsAssembly(_migrationAssembly?.FullName)
          .MigrationsHistoryTable(MigrationTableName, TableSchema)
          .UseNetTopologySuite();

        // enable correct NULLs sorting (NULLs first on ASC, NULLs last on DESC)
        typeof(NpgsqlDbContextOptionsBuilder)
          .GetMethod("ReverseNullOrdering", BindingFlags.Instance | BindingFlags.NonPublic)!
          .Invoke(options, [true]);
      });

      options.AddInterceptors(
        new FuzzySearchContainsInterceptor());
    }
    else if (Dialect == SupportedDbDialect.MsSqlServer)
    {
      _migrationAssembly ??= LoadMigrationAssembly("RealGimm.Infra.MsSql.dll");

      options.UseSqlServer(usableConnectionString, options =>
      {
        options
          .MigrationsAssembly(_migrationAssembly?.FullName)
          .MigrationsHistoryTable(MigrationTableName, TableSchema)
          .UseNetTopologySuite();
      });
    }

    if (_filterInterceptor is not null)
    {
      options.AddInterceptors(_filterInterceptor);
    }
  }

  public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
  {
    // prepare events before changes
    if (_dispatcher is not null)
    {
      var entitiesWithEvents = ChangeTracker.Entries<EntityBase>()
          .Select(e => e.Entity)
          .ToArray();

      foreach (var entity in entitiesWithEvents)
      {
        entity?.UpdateDomainEventsBeforeSave();
      }
    }

    int result = await base.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

    // ignore events if no dispatcher provided
    if (_dispatcher is not null)
    {
      // dispatch events only if save was successful
      var entitiesWithEvents = ChangeTracker.Entries<EntityBase>()
          .Select(e => e.Entity)
          .Where(e => e.DomainEvents.Any())
          .ToArray();

      await _dispatcher.DispatchAndClearEvents(entitiesWithEvents);
    }

    _filterInterceptor?.InvalidateAccessCaches();

    return result;
  }

  private static Assembly LoadMigrationAssembly(string fileName)
  {
    var assemblyFile = Path.Combine(
        Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location) ?? ".",
        fileName);

    if (File.Exists(assemblyFile))
    {
      return AssemblyLoadContext.Default.LoadFromAssemblyPath(assemblyFile);
    }

    throw new FileNotFoundException($"Migration assembly {fileName} not found.");
  }

  public override int SaveChanges()
  {
    return SaveChangesAsync().GetAwaiter().GetResult();
  }

  [DbFunction(Name = UNACCENT, Schema = "public")]
  public static string Unaccent(string source)
  {
    throw new NotSupportedException();
  }
}
