using RealGimm.SharedKernel;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Anag.SubjectAggregate;
using RealGimm.Core.Mtnt.Interfaces;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Mtnt.TenantAggregate.Specifications;
using RealGimm.SharedKernel.Interfaces;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.ConfigAggregate.Specifications;
using RealGimm.Infrastructure.Common.Geocoding;
using RealGimm.Infrastructure.Docs.Data;
using Microsoft.EntityFrameworkCore;

namespace RealGimm.Infrastructure;

public class SingleTenantHandler : ISingleTenantHandler
{
  public const string ST_NAME = "RG5_ST_NAME";
  public const string ST_GUID = "RG5_ST_GUID";
  public const string ST_COUNTRY = "RG5_ST_COUNTRY";
  public const string ST_ADMIN_PASSWORD = "RG5_ST_ADMINPW";
  public const string ST_NOMINATIM_URL = "RG5_ST_NOMINATIM";
  public const string ST_CMIS_URL = "RG5_ST_CMIS_URL";
  public const string ST_CMIS_USER = "RG5_ST_CMIS_USERNAME";
  public const string ST_CMIS_PASS = "RG5_ST_CMIS_PASSWORD";
  public const string ST_CMIS_BASEDIR = "RG5_ST_CMIS_BASEDIR";
  public const string RG5_ST_SOURCE_CONNSTR = "RG5_ST_SOURCE_CONNSTR";
  public const string ST_MAKEDEMO = "RG5_ST_MAKEDEMO";
  public bool CanHandle
  {
    get
    {
      return Environment.GetEnvironmentVariables().Contains(ST_NAME);
    }
  }

  public required IRepository<Tenant> TenantRepository { private get; init; }
  public required IRepository<Config> ConfigRepository { private get; init; }
  public required IReadRepository<Subject> SubjectRepository { private get; init; }
  public required ILogger<SingleTenantHandler> Logger { private get; init; }
  public required IUserDataProvider UserDataProvider { private get; init; }
  public required IDataSeeder DataSeeder { private get; init; }
  public required ITenantPreparer TenantPreparer { private get; init; }

  public async Task<bool> HandleSingleTenant(CancellationToken token = default)
  {
    var rawGuid = Environment.GetEnvironmentVariable(ST_GUID);

    var tenantGuid = !string.IsNullOrEmpty(rawGuid)
      ? Guid.Parse(rawGuid)
      : Guid.NewGuid();

    var tenantName = Environment.GetEnvironmentVariable(ST_NAME);

    //Ensure the tenant exists. If it does not, create it.
    var tenant = (await TenantRepository.ListAsync(token))
      .FirstOrDefault(t => t.Name == tenantName);

    var country = Environment.GetEnvironmentVariable(ST_COUNTRY);

    if (!string.IsNullOrEmpty(country))
    {
      CountryCulture.SetCountry(country);
    }

    if (tenant is null)
    {
      //Only when creating is the GUID used
      await CreateTenant(tenantName!, tenantGuid, country, token);
    }
    else
    {
      //Set tenant GUID for next usages
      UserDataProvider.SetTenantId(tenant.GUID);
    }

    //Check if the tenant is set as demo, and if the tenant is empty, make it a demo tenant.
    if (Environment.GetEnvironmentVariable(ST_MAKEDEMO).IsHumanTrue())
    {
      if (await SubjectRepository.AsQueryable().AnyAsync(cancellationToken: token))
      {
        Logger.LogInformation("Skipping demo data creation because tenant already has subjects");
      }
      else
      {
        await TenantPreparer.FillWithDemoDataAsync(false, token);
      }
    }
    else
    {
      Logger.LogInformation("Not inserting demo data for tenant {tenant}", tenantGuid);
    }

    //Ensure tenant settings are up-to-date
    var nominatimUrl = Environment.GetEnvironmentVariable(ST_NOMINATIM_URL);
    if (!string.IsNullOrEmpty(nominatimUrl))
    {
      await SetConfig(
        ConfigFunction.Geocoder,
        NominatimResolver.PARAM_URL,
        nominatimUrl,
        token);
    }

    var CMISUrl = Environment.GetEnvironmentVariable(ST_CMIS_URL);
    if (!string.IsNullOrEmpty(CMISUrl))
    {
      await SetConfig(
        ConfigFunction.CMISEndpoint,
        CmisSession.CMIS_ATOMURL,
        CMISUrl,
        token);
    }

    var CMISUsername = Environment.GetEnvironmentVariable(ST_CMIS_USER);
    if (!string.IsNullOrEmpty(CMISUsername))
    {
      await SetConfig(
        ConfigFunction.CMISEndpoint,
        CmisSession.CMIS_USERNAME,
        CMISUsername,
        token);
    }

    var CMISPass = Environment.GetEnvironmentVariable(ST_CMIS_PASS);
    if (!string.IsNullOrEmpty(CMISPass))
    {
      await SetConfig(
        ConfigFunction.CMISEndpoint,
        CmisSession.CMIS_PASSWORD,
        CMISPass,
        token);
    }

    var CMISBasedir = Environment.GetEnvironmentVariable(ST_CMIS_BASEDIR);
    if (!string.IsNullOrEmpty(CMISBasedir))
    {
      await SetConfig(
        ConfigFunction.CMISEndpoint,
        CmisSession.CMIS_BASE_DIRECTORY,
        CMISBasedir,
        token);
    }

    var sourceConnStr = Environment.GetEnvironmentVariable(RG5_ST_SOURCE_CONNSTR);
    if (!string.IsNullOrEmpty(sourceConnStr))
    {
      await SetConfig(
        ConfigFunction.DataImport,
        ConfigWellKnownNames.DATA_IMPORT_CONNECTION_STRING,
        sourceConnStr,
        token);
    }

    return true;
  }

  private async Task SetConfig(ConfigFunction function, string codeName, string value, CancellationToken token)
  {
    //Get existing, if any
    var code = await ConfigRepository.FirstOrDefaultAsync(
      new ConfigByFunctionNameSpec(function, codeName), token);

    if (code is not null && code.Value != value)
    {
      code.SetValue(value);
      await ConfigRepository.UpdateAsync(code, token);
    }
    else if (code is null)
    {
      code = new Config();
      code.SetReferenceData(codeName, function);
      code.SetValue(value);
      await ConfigRepository.AddAsync(code, token);
    }
  }

  private async Task<bool> CreateTenant(string name, Guid guid, string? country, CancellationToken ct)
  {
    var tsearch = new TenantByNameOrGuid(guid, name);

    if (await TenantRepository.AnyAsync(tsearch, ct))
    {
      Logger.LogError("Cannot create a tenant {tenantName}/{tenantGuid}, another one already exists.",
        name, guid);
      return false;
    }

    await TenantRepository.AddAsync(new Tenant(name, guid, null), ct);

    UserDataProvider.SetTenantId(guid);

    Logger.LogInformation("Tenant created; starting data seeder...");

    // Seed Database for the new tenant
    try
    {
      var (admUsername, admPass, admHash) = IAM.DataGenerator.Users.GetAdminData(
        name,
        Environment.GetEnvironmentVariable(ST_ADMIN_PASSWORD)!);

      await DataSeeder.InitializeAsync(admUsername, admHash, ct);

      Logger.LogInformation("Tenant data initialized successfully.");
    }
    catch (Exception ex)
    {
      Logger.LogError(ex, "An error occurred seeding the DB.");
      return false;
    }

    // If country-specific data seed is requested, perform it.
    if (!string.IsNullOrEmpty(country))
    {
      try
      {
        await DataSeeder.InitializePerCountryAsync(country, ct);
      }
      catch (Exception ex)
      {
        Logger.LogError(ex, "An error occurred seeding the DB with country data.");
        return false;
      }
    }

    return true;
  }
}
