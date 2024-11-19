using RealGimm.Web.Admin.DataLoaders;
using RealGimm.Core.IAM;
using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Core.Common.AuditLogAggregate;
using UAgg = RealGimm.Core.IAM.UserAggregate;
using RealGimm.Web.Admin.Queries.Filters;
using RealGimm.Web.Admin.Queries.Sorting;
using HotChocolate.Resolvers;
using Microsoft.EntityFrameworkCore;
using RealGimm.WebCommons.Models;
using RealGimm.Core.IAM.Services;
using RealGimm.Core.Shared.Interfaces;
using RealGimm.Core.IAM.UserAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.Core;
using Microsoft.Extensions.Caching.Distributed;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.Interfaces;
using RealGimm.Core.IAM.UserAggregate;

namespace RealGimm.Web.Admin.Queries;

public class AdminQueries : QueriesBase
{
  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Read)]
    public async Task<UAgg.User?> GetUser(
    int userId,
    [Service] IReadRepository<UAgg.User> repository,
    CancellationToken cancellationToken = default)
    => await repository
      .AsQueryable(new GetByIdSpec<UAgg.User>(userId), new UserIncludeAllSpec())
      .FirstOrDefaultAsync(cancellationToken);

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(UserFilterType))]
  [UseSorting(typeof(UserSortInputType))]
  public async Task<IQueryable<UAgg.User>> ListUsers(
    [Service] RepositoryWebWrapper<UAgg.User> repository,
    [SchemaService] IResolverContext? resolverContext)
    => await repository.ListAllAsync(resolverContext, new EntityNonDeletedSpec<UAgg.User>(), new UserIncludeAllSpec());

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Read)]
  public async Task<bool> CanUseUsername(
    string userName,
    int? currentUserId,
    [Service] IReadRepository<User> repository,
    CancellationToken cancellationToken = default)
  {
    var getByUsernameSpec = new UserByUsernameSpec(userName);

    var isCodeInUse = currentUserId.HasValue
      ? await repository
          .AsQueryable(getByUsernameSpec, new ExcludeByIdSpec<User>(currentUserId.Value))
          .AnyAsync(cancellationToken)
      : await repository.AnyAsync(getByUsernameSpec, cancellationToken);

    return !isCodeInUse;
  }

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Read)]
  public async Task<IEnumerable<PermissionSummary>> GetGroupPermissions(
    int[] groupIds,
    [Service] GroupPermissionService permService)
    => await permService.GetPermissionSummaryAsync(groupIds);

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Read)]
  public async Task<Group?> GetGroup(int groupId, GroupBatchDataLoader loader, CancellationToken cancellationToken = default)
    => await loader.LoadAsync(groupId, cancellationToken);

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(GroupFilterType))]
  [UseSorting(typeof(GroupSortInputType))]
  public IQueryable<Group> ListGroup([Service] IReadRepository<Group> repo) => repo.AsQueryable();

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Read)]
  public IEnumerable<string> ListFeatures() => Features.AdminFeatureList().Concat(Features.UserFeatureList());

  [BackOfficePermission(Features.ADMIN_AUDIT_LOG, Permission.Read)]
  [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
  [UseFiltering(typeof(AuditLogFilterType))]
  [UseSorting]
  public IQueryable<AuditLog> ListAuditEvents([Service] IReadRepository<AuditLog> repo)
    => repo.AsQueryable();

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Read)]
  [UseFiltering(typeof(UserFilterType))]
  [UseSorting(typeof(UserSortInputType))]
  public async Task<FileUrlOutput> ExportToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IReadRepository<UAgg.User> userRepository,
    [Service] IExportService<UAgg.User> exportService,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
  {
    var users = userRepository
      .AsQueryable(new UserIncludeAllForListSpec(), new EntityNonDeletedSpec<UAgg.User>())
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArray();

    return await ExportToExcelAsync(users, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Read)]
  [UseFiltering(typeof(GroupFilterType))]
  [UseSorting(typeof(GroupSortInputType))]
  public async Task<FileUrlOutput> ExportGroupsToExcel(
    [SchemaService] IResolverContext resolverContext,
    [Service] IReadRepository<Group> repository,
    [Service] IExportService<Group> exportService,
    [Service] IDistributedCache distributedCache,
    CancellationToken cancellationToken = default)
  {
    var groups = await repository
      .AsQueryable()
      .Filter(resolverContext)
      .Sort(resolverContext)
      .ToArrayAsync(cancellationToken);

    return await ExportToExcelAsync(groups, distributedCache, exportService, cancellationToken);
  }

  [BackOfficePermission(Features.ADMIN_CONFIG, Permission.Read)]
  [UseFiltering<ConfigFilterType>]
  [UseSorting<ConfigSortInputType>]
  public async Task<IEnumerable<Config>> ListConfigs(
    [Service] IRepository<Config> repository,
    [Service] IServiceProvider serviceProvider)
  {
    var configs = await repository.ListAsync();
    var configurableModules = serviceProvider.GetServices<IConfigurableModule>();

    return configurableModules.SelectMany(module => module.ConfigurationParameters
      .Select(parameter =>
      {
        var config = configs.SingleOrDefault(config => config.Function == module.Function && config.Name == parameter);
        if (config is null)
        {
          config = new Config();
          config.SetReferenceData(parameter, module.Function);
        }

        return config;
      }));
  }
}
