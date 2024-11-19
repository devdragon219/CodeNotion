using RealGimm.Core.Mtnt.Interfaces;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Mtnt.TenantAggregate.Specifications;
using RealGimm.SharedKernel.Interfaces;
using McMaster.Extensions.CommandLineUtils;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.SharedKernel;

namespace RealGimm.TenantCtl.Commands;

[Command(Name = "add", Description = "Add a new tenant.")]
[HelpOption]
class Add
{
  [Argument(0, Description = "The name of the new tenant.")]
  public string? Name { get; }

  [Option("-g|--guid", Description = "The GUID to assign to the new tenant. If unspecified, a new one will be randomly generated.")]
  public string? Guid { get; }

  [Option("-c|--country", Description = "The country to use for country-specific data seed operations.")]
  public string? Country { get; }

  private readonly IServiceProvider _services;

  public Add(IServiceProvider svc)
  {
    _services = svc;
  }

  private async Task<int> OnExecuteAsync(CommandLineApplication app, CancellationToken ct)
  {
    if (string.IsNullOrEmpty(Name))
    {
      app.Error.WriteLine("Please enter the name of the tenant.");
      return ErrorResults.E_MISSING_PARAMETERS;
    }

    CountryCulture.SetCountry(Country);

    var tenantRepo = _services.GetRequiredService<IRepository<Tenant>>();
    var tenantGuid = !string.IsNullOrEmpty(Guid)
      ? System.Guid.Parse(Guid)
      : System.Guid.NewGuid();
    var tenantName = Name!;
    var tsearch = new TenantByNameOrGuid(tenantGuid, tenantName);

    if (await tenantRepo.AnyAsync(tsearch, ct))
    {
      app.Error.WriteLine($"Cannot create a tenant {tenantName}/{tenantGuid}, another one already exists.");
      return ErrorResults.E_TENANTEXISTS;
    }

    await tenantRepo.AddAsync(new Tenant(tenantName, tenantGuid, null), ct);

    var udp = _services.GetRequiredService<IUserDataProvider>();
    udp.SetTenantId(tenantGuid);

    app.Out.WriteLine("Tenant created; starting data seeder...");

    IDataSeeder seeder;

    // Seed Database for the new tenant
    try
    {
      seeder = _services.GetRequiredService<IDataSeeder>();
      var userdatagenerator = _services.GetRequiredService<IUserDataGenerator>();

      var (admUsername, admPass, admHash) = userdatagenerator.GetAdminUsernamePasswordAndHash(tenantName);

      await seeder.InitializeAsync(admUsername, admHash, ct);

      app.Out.WriteLine("Tenant data initialized successfully.");

      // Do not change this formatting, as it's picked up by automated testing.
      app.Out.WriteLine($"Administrator login: [{admUsername}] with password: [{admPass}] for tenant: [{tenantGuid:N}]");
    }
    catch (Exception ex)
    {
      app.Error.WriteLine($"An error occurred seeding the DB. {ex}");
      return ErrorResults.E_TENANTSEEDFAILURE;
    }

    // If country-specific data seed is requested, perform it.
    if (!string.IsNullOrEmpty(Country))
    {
      try
      {
        await seeder.InitializePerCountryAsync(Country, ct);
      }
      catch (Exception ex)
      {
        app.Error.WriteLine($"An error occurred seeding the DB with country data. {ex}");
        return ErrorResults.E_TENANTSEEDFAILURE;
      }
    }

    return 0;
  }
}