using RealGimm.Core.Mtnt.Interfaces;
using RealGimm.Core.IAM;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.SharedKernel.Interfaces;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Localization;
using RealGimm.Core.Common.Interfaces;

namespace RealGimm.Core.Mtnt;

public class TenantDataSeeder : IDataSeeder
{
  public required ILogger<TenantDataSeeder> _log { protected get; init; }
  public required ITenantPreparer _tenantPreparer { protected get; init; }
  public required IRepository<User> _users { protected get; init; }
  public required IRepository<Group> _groups { protected get; init; }
  public required IEnumerable<IModuleDataSeeder> _seeders { protected get; init; }
  public required IEnumerable<ICityProvider> _cityProviders { protected get; init; }
  public required IEnumerable<IRegistrationOfficeProvider> _registrationOfficeProviders { protected get; init; }
  public required IEnumerable<IInterestRateProvider> _interestRateProviders { protected get; init; }
  public required IEnumerable<IRevaluationDataProvider> _revaluationDataProviders { protected get; init; }
  public required IStringLocalizer _localizer { protected get; init; }

  public async Task InitializeAsync(string adminUsername, string adminPasswordHash, CancellationToken cancellationToken = default)
  {
    await _tenantPreparer.PrepareAsync(cancellationToken);

    _log.LogInformation("Prepared db for new tenant; adding default groups");

    var adminGroup = await _groups.AddAsync(new Group(_localizer["TenantGroups.AdminName"]), cancellationToken);
    adminGroup.SetGroupDescription(_localizer["TenantGroups.AdminDescription"]);

    //Add all available features to this group
    foreach (var feat in Features.AllFeatureList())
    {
      adminGroup.SetFeature(feat, true, true, true, true);
    }

    await _groups.UpdateAsync(adminGroup, cancellationToken);

    _log.LogInformation("Created administration group {groupId}", adminGroup.Id);

    var baseGroup = await _groups.AddAsync(new Group(_localizer["TenantGroups.BaseName"]), cancellationToken);
    baseGroup.SetGroupDescription(_localizer["TenantGroups.BaseDescription"]);

    //Add all available user features to this group
    foreach (var feat in Features.UserFeatureList())
    {
      baseGroup.SetFeature(feat, true, true, true, true);
    }

    await _groups.UpdateAsync(baseGroup, cancellationToken);

    _log.LogInformation("Created base group {groupId}", baseGroup.Id);

    var user = await _users.AddAsync(new User(adminUsername, UserType.Internal, adminPasswordHash), cancellationToken);
    user.SetOfficeAccess(OfficeAccess.Both);
    user.AddGroup(adminGroup);
    user.SetLimitDates(DateTime.UtcNow, null, null);

    await _users.UpdateAsync(user, cancellationToken);

    var admin = await _users.GetByIdAsync(user.Id, cancellationToken);

    _log.LogInformation("Created administration user {adminId} has {groupNumber} groups",
      user.Id,
      admin?.Groups.Select(g => g.Name).ToArray()
    );

    foreach (var s in _seeders.DistinctBy(s => s.GetType().Name))
    {
      _log.LogInformation("Running {dataSeederModule} module seeder...", s.GetType().Name);
      await s.InitializeAsync();
    }
  }

  public async Task InitializePerCountryAsync(string countryIso3, CancellationToken cancellationToken)
  {
    foreach (var cp in _cityProviders
      .GroupBy(cprov => cprov.Id)
      .Select(grp => grp.First()))
    {
      if (cp.CanHandleCountry(countryIso3))
      {
        await cp.ImportUpdatesMasterList(countryIso3, null, cancellationToken);

        _log.LogInformation("Per-country city data imported via {Importer}", cp.GetType().Name);
      }
    }

    foreach (var rop in _registrationOfficeProviders
      .GroupBy(cprov => cprov.Id)
      .Select(grp => grp.First()))
    {
      if (rop.CanHandleCountry(countryIso3))
      {
        await rop.ImportUpdatesMasterList(countryIso3, cancellationToken);

        _log.LogInformation("Per-country registration office data imported via {Importer}", rop.GetType().Name);
      }
    }

    foreach (var irp in _interestRateProviders
      .GroupBy(cprov => cprov.Id)
      .Select(grp => grp.First()))
    {
      if (irp.CanHandleCountry(countryIso3))
      {
        await irp.ImportUpdatesMasterList(countryIso3, cancellationToken);

        _log.LogInformation("Per-country interest rate data imported via {Importer}", irp.GetType().Name);
      }
    }

    foreach (var rrp in _revaluationDataProviders
      .GroupBy(cprov => cprov.Id)
      .Select(grp => grp.First()))
    {
      if (rrp.CanHandleCountry(countryIso3))
      {
        await rrp.ImportUpdatesMasterList(countryIso3, cancellationToken);

        _log.LogInformation("Per-country revaluation data imported via {Importer}", rrp.GetType().Name);
      }
    }
  }

  public async Task UpdateAsync(CancellationToken cancellationToken)
  {
    //Force update features for the two default groups
    var adminGroup = await _groups.GetByIdAsync(1, cancellationToken);

    if (adminGroup is not null)
    {
      foreach (var feat in Features.UserFeatureList().Concat(Features.AdminFeatureList()))
      {
        adminGroup.SetFeature(feat, true, true, true, true);
      }

      await _groups.UpdateAsync(adminGroup, cancellationToken);
    }

    var baseGroup = await _groups.GetByIdAsync(2, cancellationToken);

    if (baseGroup is not null)
    {
      foreach (var feat in Features.UserFeatureList())
      {
        baseGroup.SetFeature(feat, true, true, true, true);
      }

      await _groups.UpdateAsync(baseGroup, cancellationToken);
    }

    foreach (var s in _seeders.DistinctBy(s => s.GetType().Name))
    {
      _log.LogInformation("Running {dataSeederModule} module seed update...", s.GetType().Name);
      await s.UpdateAsync();
    }
  }
}
