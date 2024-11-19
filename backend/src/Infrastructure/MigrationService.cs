using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Npgsql;
using RealGimm.SharedKernel.Attributes;
using System.Diagnostics.CodeAnalysis;

namespace RealGimm.Infrastructure;

public class MigrationService(
  ILogger<MigrationService> logger,
  IServiceProvider serviceProvider)
{
  private readonly ILogger<MigrationService> _logger = logger;
  private readonly IServiceProvider _serviceProvider = serviceProvider;

  private static async Task MaybeUnique(DbContext context, string sqlRaw)
  {
    try
    {
      await context.Database.ExecuteSqlRawAsync(sqlRaw);
    }
    catch (PostgresException pe)
    {
      if (pe.SqlState != "23505")
      {
        throw;
      }
    }
  }

  public async Task Setup(DbContext context)
  {
    if (!context.Database.IsInMemory())
    {
      var dbCreator = context.GetService<IDatabaseCreator>() as RelationalDatabaseCreator;

      if (!await dbCreator!.ExistsAsync())
      {
        //Only run if the database does not exist yet.
        await dbCreator.CreateAsync();
      }
    }

    if (context.Database.IsNpgsql())
    {

      await MaybeUnique(context, "CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public");

      //Create custom text unaccent function (immutable)
      await MaybeUnique(context, "CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public");
      await MaybeUnique(context, "CREATE EXTENSION IF NOT EXISTS pg_trgm");
      try
      {
        await context.Database.ExecuteSqlRawAsync($"""
        BEGIN;
        SELECT pg_advisory_xact_lock(116352588);
        CREATE OR REPLACE FUNCTION {TrackableDbContext.UNACCENT}(varchar)
          RETURNS text AS $$
            SELECT public.unaccent($1)
          $$ LANGUAGE sql IMMUTABLE;
        COMMIT;
      """);
      }
      catch (Exception e)
      {
        _logger.LogWarning(e, "Unable to create or replace function unaccent");
      }
    }
  }

  public async Task Migrate(DbContext context, CancellationToken cancellationToken)
  {
    context.Database.SetCommandTimeout(TimeSpan.FromHours(1));

    _logger.LogInformation("Discovering migrations...");
    
    var migrations = (await context.Database
        .GetPendingMigrationsAsync(cancellationToken: cancellationToken)
      ).ToArray();

    if (migrations.Length == 0)
    {
      _logger.LogInformation("No migrations were found");
      return;
    }

    var migrationClasses = AppDomain.CurrentDomain
      .GetAssemblies()
      .Where(a => a.GetName().Name is string name && name.StartsWith("RealGimm.Infra."))
      .SelectMany(a => a.DefinedTypes)
      .Where(x => x.CustomAttributes.Any(a => a.AttributeType == typeof(MigrationAttribute)))
      .ToArray();

    _logger.LogInformation("Applying migrations...");
    
    foreach (var migrationId in migrations)
    {
      await ApplyMigration(migrationClasses, migrationId, context, cancellationToken);
    }

    //Checking for manual unaccent index annotation in the model, and fixing it
    // in the DB where needed
    if (context.Database.IsNpgsql())
    {
      await ApplyUnaccendIndex(context, cancellationToken);
    }

    _logger.LogInformation("Migrations applied.");

    //Reloading any new types introduced via migrations or loaded extensions
    await context.Database.OpenConnectionAsync(cancellationToken: cancellationToken);

    if (context.Database.IsNpgsql())
    {
      await ((NpgsqlConnection)context.Database.GetDbConnection()).ReloadTypesAsync();
    }
  }

  private static async Task ApplyUnaccendIndex(DbContext context, CancellationToken cancellationToken = default)
  {
    foreach (var entityType in context.Model.GetEntityTypes())
    {
      // skipping OwnsOne owned entities since they are not stored in a separate table
      if (entityType.IsOwned() && entityType.FindOwnership()!.IsUnique)
      {
        continue;
      }

      var tableName = entityType.GetTableName()!;
      var schema = entityType.GetSchema() ?? "public";

      var fuzzySearchableProperties = entityType
        .GetProperties()
        .Where(property =>
          property.PropertyInfo is not null &&
          property.GetJsonPropertyName() is null &&
          property.PropertyInfo.IsDefined(typeof(FuzzySearchableAttribute), true));

      foreach (var property in fuzzySearchableProperties)
      {
        await CreateUnaccentIndexAsync(context, schema, tableName, property.GetColumnName(), cancellationToken);
      }

      // selecting OwnsOne owned navigations since their properties are stored in a parent table
      var ownedNavigations = entityType
        .GetNavigations()
        .Where(navigation => navigation.TargetEntityType.IsOwned() && navigation.TargetEntityType.FindOwnership()!.IsUnique);

      foreach (var navigation in ownedNavigations)
      {
        var ownedEntityType = navigation.TargetEntityType;

        var ownedFuzzySearchableProperties = ownedEntityType
          .GetProperties()
          .Where(property =>
            property.PropertyInfo is not null &&
            property.PropertyInfo.IsDefined(typeof(FuzzySearchableAttribute), true));

        foreach (var property in ownedFuzzySearchableProperties)
        {
          var columnName = $"{navigation.Name}_{property.GetColumnName()}";
          await CreateUnaccentIndexAsync(context, schema, tableName, columnName, cancellationToken);
        }
      }
    }
  }

  [SuppressMessage("Security", "EF1002:Risk of vulnerability to SQL injection.", Justification = "<Pending>")]
  private static async Task CreateUnaccentIndexAsync(
    DbContext context,
    string schema,
    string tableName,
    string columnName,
    CancellationToken cancellationToken)
    => await context.Database.ExecuteSqlRawAsync(
        $"""
        CREATE INDEX IF NOT EXISTS "IX_{tableName}_{columnName}_rgsrc"
          ON "{schema}"."{tableName}"
          USING GIN ({TrackableDbContext.UNACCENT}("{columnName}") gin_trgm_ops)
        """,
        cancellationToken);

  private async Task ApplyMigration(IEnumerable<TypeInfo> migrationClasses,
    string migrationId, DbContext context, CancellationToken cancellationToken)
  {
    var migrationType = migrationClasses
      .SingleOrDefault(x => x.GetCustomAttribute<MigrationAttribute>()?.Id == migrationId)
      ?? throw new InvalidOperationException($"Cannot find migration class with id {migrationId}");

    var scriptTypeMarker = typeof(IMigrationScript<>).MakeGenericType(migrationType);

    var scripts = typeof(IMigrationScript<>).Assembly
      .DefinedTypes
      .Where(t => t.GetInterfaces().Any(x => x == scriptTypeMarker))
      .Select(Activator.CreateInstance)
      .Cast<IMigrationScript>()
      .ToArray();

    try
    {
      _logger.LogInformation("Applying {MigrationId}", migrationId);
      foreach (var script in scripts)
      {
        script.OnPreUp(context, _serviceProvider);
      }

      await context.Database.GetInfrastructure()
        .GetService<IMigrator>()!
        .MigrateAsync(migrationId, cancellationToken);

      foreach (var script in scripts)
      {
        script.OnPostUp(context, _serviceProvider);
      }
    }
    catch (Exception e)
    {
      _logger.LogCritical(e, "Error while applying migration {MigrationId}", migrationId);
      throw new InvalidOperationException($"Error while applying migration {migrationId}", e);
    }
  }
}
