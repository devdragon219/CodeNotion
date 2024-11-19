using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RealGimm.Core;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.Mtnt.Interfaces;
using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Infrastructure;
using RealGimm.Infrastructure.Docs.Data;
using RealGimm.Infrastructure.Mtnt.Data;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.FunctionalTests.Web;

public class TestInfrastructurePreparer : IInfrastructurePreparer
{
  private readonly MigrationService _migrationService;
  private readonly IRepository<Tenant> _tenantRepository;
  private readonly IUserDataProvider _userDataProvider;
  private readonly IConfiguration _configuration;
  private readonly IServiceProvider _serviceProvider;
  private readonly MtntDbContext _mtntContext;
  private readonly ILogger<TestInfrastructurePreparer> _logger;

  public const string SeedDefaultDataOptionName = "SeedDefaultData";

  public TestInfrastructurePreparer(
    MigrationService migrationService,
    IRepository<Tenant> tenantRepository,
    IUserDataProvider userDataProvider,
    IConfiguration configuration,
    IServiceProvider serviceProvider,
    ILogger<TestInfrastructurePreparer> logger,
    MtntDbContext mtntContext)
  {
    _migrationService = migrationService;
    _tenantRepository = tenantRepository;
    _userDataProvider = userDataProvider;
    _configuration = configuration;
    _serviceProvider = serviceProvider;
    _mtntContext = mtntContext;
    _logger = logger;
  }

  public async Task PrepareAsync(CancellationToken cancellationToken)
  {
    await _migrationService.Setup(_mtntContext);
    await _migrationService.Migrate(_mtntContext, cancellationToken);
    await CreateDefaultTenant(cancellationToken);
  }

  private async Task CreateDefaultTenant(CancellationToken cancellationToken)
  {
    _logger.LogInformation("Creating default tenant");
    _userDataProvider.SetTenantId(UserIdentity.DefaultTenantGuid);

    var tenantPreparer = _serviceProvider.GetRequiredService<ITenantPreparer>();
    await tenantPreparer.PrepareAsync(cancellationToken);

    var dataSeeder = _serviceProvider.GetRequiredService<IDataSeeder>();
    await dataSeeder.InitializeAsync(UserIdentity.DefaultUserName,
      new PasswordHasher<object>().HashPassword(new(), UserIdentity.DefaultUserPassword),
      cancellationToken);

    await dataSeeder.InitializePerCountryAsync(CountryISO3.ITA,
      cancellationToken);

    await _tenantRepository.AddAsync(
      new Tenant(UserIdentity.DefaultTenant, UserIdentity.DefaultTenantGuid, "Default Tenant"),
      cancellationToken);

    if (_configuration.GetValue<bool>(SeedDefaultDataOptionName))
    {
      await tenantPreparer.FillWithDemoDataAsync(true, cancellationToken);

      var configRepo = _serviceProvider.GetRequiredService<IRepository<Config>>();

      var sharedCmis = SharedDockerCmisService.GetOrCreate();

      await sharedCmis.StartAsync();

      await SetCMISConfig(configRepo, CmisSession.CMIS_ATOMURL, sharedCmis.GetConnectionAtomURL());
      await SetCMISConfig(configRepo, CmisSession.CMIS_USERNAME, "test");
      await SetCMISConfig(configRepo, CmisSession.CMIS_PASSWORD, "test");
    }
    else
    {
      //Just prepare the admin user
      var userRepo = _serviceProvider.GetRequiredService<IRepository<User>>();

      var adminUser = await userRepo.GetByIdAsync(1, cancellationToken);

      if (adminUser is not null)
      {
        adminUser.SetSubjectsAndOrgUnits(
          Enumerable.Range(1, 250).ToArray(),
          null
        );

        await userRepo.UpdateAsync(adminUser, cancellationToken);
      }

    }
  }

  private static async Task SetCMISConfig(IRepository<Config> configRepo, string name, string value)
  {
    var cmisSetting = new Config();
    cmisSetting.SetReferenceData(name, ConfigFunction.CMISEndpoint);
    cmisSetting.SetValue(value);

    await configRepo.AddAsync(cmisSetting);
  }
}
