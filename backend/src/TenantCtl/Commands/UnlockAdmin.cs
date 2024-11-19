using RealGimm.Core.Mtnt.TenantAggregate;
using RealGimm.Core.Mtnt.TenantAggregate.Specifications;
using RealGimm.SharedKernel.Interfaces;
using McMaster.Extensions.CommandLineUtils;
using Microsoft.Extensions.DependencyInjection;
using RealGimm.Core;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.UserAggregate.Specifications;
using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Core.IAM.GroupAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Shared.Specifications;

namespace RealGimm.TenantCtl.Commands;

[Command(Name = "unlock-admin", Description = "Unlock admin account after password expiration.")]
[HelpOption]
class UnlockAdmin
{
  [Argument(0, Description = "The name or GUID of the tenant.")]
  public string? Identifier { get; }

  private readonly IServiceProvider _services;

  public UnlockAdmin(IServiceProvider svc)
  {
    _services = svc;
  }

  private async Task<int> OnExecuteAsync(CommandLineApplication app, CancellationToken ct)
  {
    if (string.IsNullOrEmpty(Identifier))
    {
      app.Error.WriteLine("Please enter the tenant identifier.");
      return ErrorResults.E_MISSING_PARAMETERS;
    }

    var tenantRepo = _services.GetRequiredService<IRepository<Tenant>>();
    var tenantName = Identifier!;
    if (!Guid.TryParse(tenantName, out Guid tenantGuid))
    {
      tenantGuid = Guid.NewGuid();
    }

    var tsearch = new TenantByNameOrGuid(tenantGuid, tenantName!);
    var searchResults = await tenantRepo.ListAsync(tsearch, ct);

    if (searchResults.Count == 1)
    {
      var tenant = searchResults.FirstOrDefault()!;

      var udp = _services.GetRequiredService<IUserDataProvider>();

      udp?.SetTenantId(tenant.GUID);

      var userRepo = _services.GetRequiredService<IRepository<User>>();
      var groupRepo = _services.GetRequiredService<IRepository<Group>>();

      var adminGroups = await groupRepo.AsQueryable(new UserAdminGroupSpec())
        .Select(g => g.Id)
        .ToArrayAsync(cancellationToken: ct);

      var admins = await userRepo.AsQueryable(
        new EntityNonDeletedSpec<User>(),
        new UserIncludeAllSpec(),
        new UserBelongsToAnyGroupsSpec(adminGroups))
        .ToListAsync(cancellationToken: ct);

      var admin = admins.FirstOrDefault(a => a.UserName.StartsWith("admin@"))
        ?? admins.FirstOrDefault();

      if (admin is not null)
      {
        var userdatagenerator = _services.GetRequiredService<IUserDataGenerator>();

        var (admUsername, admPass, admHash) = userdatagenerator.GetAdminUsernamePasswordAndHash(tenant.Name);

        if (admin.Unlock(admHash))
        {
          await userRepo.UpdateAsync(admin, ct);

          app.Out.WriteLine(
            $"Unlocked account [{admin.UserName}] with password [{admPass}] for tenant [{tenant.Name}] ({tenant.GUID})");
        }
        else
        {
          app.Out.WriteLine($"Unable to unlock account [{admin.UserName}] for tenant [{tenant.Name}] ({tenant.GUID})");
        }
      }

      return 0;
    }
    else if (searchResults.Count > 1)
    {
      return ErrorResults.E_TENANTMULTIPLEMATCHES;
    }
    else
    {
      return ErrorResults.E_TENANTNOTFOUND;
    }
  }
}
