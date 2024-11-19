using RealGimm.Web.Admin.Models;
using RealGimm.Core.IAM.GroupAggregate;
using UAgg = RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM;
using Microsoft.AspNetCore.Identity;
using Ardalis.Result;
using RealGimm.Core;
using RealGimm.Core.IAM.UserAggregate.Specifications;
using RealGimm.Core.CrossModule;
using RealGimm.Core.Shared.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.Common.ConfigAggregate;
using RealGimm.Core.Common.Interfaces;
using RealGimm.Core.Common.ConfigAggregate.Specifications;
using RealGimm.Core.Fclt.Services;

namespace RealGimm.Web.Admin.Mutations;

public class AdminMutations : MutationsBase
{
  private readonly PasswordHasher<object> _passwordHasher = new();

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Create)]
  public async Task<Result<UAgg.User>> AddUser(
    AdminUserInput userInput,
    [Service] IRepository<UAgg.User> repository,
    [Service] IRepository<Group> groups,
    CancellationToken cancellationToken = default)
  {
    var newUser = new UAgg.User(userInput.UserName, userInput.Type, null);
    newUser.SetType(userInput.Type);
    newUser.SetOfficeAccess(userInput.OfficeAccess);
    newUser.SetSupplierSubjectId(userInput.SupplierSubjectId);
    newUser.SetName(userInput.FirstName, userInput.LastName);
    newUser.SetSubjectsAndOrgUnits(userInput.ManagementSubjects, userInput.ManagementOrgUnits);

    newUser.Activate(userInput.Status, userInput.EnabledSince);

    foreach (var gid in userInput.Groups ?? Array.Empty<int>())
    {
      var group = await groups.GetByIdAsync(gid, cancellationToken);
      if (group is not null)
      {
        newUser.AddGroup(group);
      }
    }

    foreach (var contact in userInput.Contacts ?? Array.Empty<AdminContactInput>())
    {
      var newContact = new UAgg.Contact(
        ContactType.Main,
        contact.ContactInfo, contact.ContactInfoType);
      newContact.SetNotes(contact.Notes);

      newUser.AddContact(newContact);
    }

    if (!string.IsNullOrEmpty(userInput.NewPassword) && !string.IsNullOrEmpty(userInput.PasswordConfirmation))
    {
      if (!userInput.NewPassword.Equals(userInput.PasswordConfirmation))
        throw new ArgumentException("Password confirmation and new password must match");

      var hashedNewPassword = _passwordHasher.HashPassword(new object(), userInput.NewPassword);
      newUser.SetPassword(hashedNewPassword);
    }
    else
    {
      throw new ArgumentException("Setting password is required!");
    }

    if (await repository.AnyAsync(new UserByUsernameSpec(userInput.UserName), cancellationToken))
    {
      return Result<UAgg.User>.Invalid(ErrorCode.DuplicateUserName.ToValidationError());
    }

    return await repository.AddAsync(newUser, cancellationToken);
  }

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Update)]
  public async Task<Result<UAgg.User>> UpdateUser(
    int userId,
    AdminUserInput userInput,
    [Service] IRepository<UAgg.User> repository,
    [Service] IRepository<Group> groups,
    [Service] IHttpContextAccessor ctxAccessor,
    [Service] ILogger<AdminMutations> logger,
    CancellationToken cancellationToken = default)
  {
    var existingUser = await repository
      .AsQueryable(new GetByIdSpec<UAgg.User>(userId), new UserIncludeAllSpec())
      .FirstOrDefaultAsync(cancellationToken);

    if (existingUser == null)
    {
      logger.LogInformation("No such user {userId} while updating from {remoteAddress}",
        userId,
        ctxAccessor?.HttpContext?.Connection.RemoteIpAddress
        );
      return Result.Invalid(ErrorCode.InvalidUserUpdating.ToValidationError());
    }

    existingUser.SetType(userInput.Type);
    existingUser.SetOfficeAccess(userInput.OfficeAccess);
    existingUser.SetSupplierSubjectId(userInput.SupplierSubjectId);
    existingUser.SetName(userInput.FirstName, userInput.LastName);
    existingUser.SetSubjectsAndOrgUnits(userInput.ManagementSubjects, userInput.ManagementOrgUnits);

    existingUser.Cease(userInput.Status, userInput.CeasedDate);
    existingUser.Activate(userInput.Status, userInput.EnabledSince);
    existingUser.Suspend(userInput.Status, userInput.LockedSince, userInput.SuspensionReason);

    var groupsToBe = userInput.Groups ?? Array.Empty<int>();
    var existingGroups = existingUser.Groups.Select(g => g.Id).ToArray();

    foreach (var gid in groupsToBe.Except(existingGroups))
    {
      var group = await groups.GetByIdAsync(gid, cancellationToken);
      if (group is not null)
      {
        existingUser.AddGroup(group);
      }
    }

    foreach (var gid in existingGroups.Except(groupsToBe))
    {
      var group = await groups.GetByIdAsync(gid, cancellationToken);
      if (group is not null)
      {
        existingUser.RemoveGroup(group);
      }
    }

    existingUser.ClearContacts();
    foreach (var contact in userInput.Contacts ?? Array.Empty<AdminContactInput>())
    {
      var newContact = new UAgg.Contact(
        ContactType.Main,
        contact.ContactInfo, contact.ContactInfoType);
      newContact.SetNotes(contact.Notes);

      existingUser.AddContact(newContact);
    }

    if (!string.IsNullOrEmpty(userInput.NewPassword) && !string.IsNullOrEmpty(userInput.PasswordConfirmation))
    {
      if (!userInput.NewPassword.Equals(userInput.PasswordConfirmation))
        throw new ArgumentException("Password confirmation and new password must match");

      var hashedNewPassword = _passwordHasher.HashPassword(new object(), userInput.NewPassword);
      existingUser.SetPassword(hashedNewPassword);
    }

    await repository.UpdateAsync(existingUser, cancellationToken);
    return existingUser;
  }

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Delete)]
  public async Task<Result> DeleteUser(
    int userId,
    [Service] IRepository<UAgg.User> repository,
    [Service] DeletedUserNameSuggestionService deletedUserNameSuggestionService,
    CancellationToken cancellationToken = default)
  {
    var userToDelete = await repository
      .AsQueryable(new GetByIdSpec<UAgg.User>(userId), new EntityNonDeletedSpec<UAgg.User>())
      .SingleOrDefaultAsync(cancellationToken);

    if (userToDelete is null)
    {
      return Result.NotFound();
    }

    var newUserName = await deletedUserNameSuggestionService.SuggestAsync(userToDelete.UserName);
    userToDelete.SetUserName(newUserName);

    userToDelete.MarkAsDeleted();

    await repository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Delete)]
  public async Task<Result> DeleteByIds(
    int[] userIds,
    [Service] IRepository<UAgg.User> repository,
    [Service] DeletedUserNameSuggestionService deletedUserNameSuggestionService,
    CancellationToken cancellationToken = default)
  {
    var usersToDelete = await repository
      .AsQueryable(new GetByIdsSpec<UAgg.User>(userIds), new EntityNonDeletedSpec<UAgg.User>())
      .ToListAsync(cancellationToken);

    foreach (var user in usersToDelete)
    {
      var newUserName = await deletedUserNameSuggestionService.SuggestAsync(
        user.UserName,
        additionallyOccupiedUserNames: usersToDelete.Select(user => user.UserName).ToArray());

      user.SetUserName(newUserName);
      user.MarkAsDeleted();
    }

    await repository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Create)]
  public async Task<Result<Group>> AddGroup(
    AdminGroupInput groupInput,
    [Service] IRepository<Group> repository,
    CancellationToken cancellationToken = default)
  {
    Group newGroup = new(groupInput.Name, groupInput.Description);
    if (groupInput.Features is not null && groupInput.Features.Any())
    {
      var systemFeatures = Features.AllFeatureList();
      var notExistingFeatures = groupInput.Features.Select(e => e.Feature).Except(systemFeatures);
      if (notExistingFeatures.Any()) throw new ArgumentException($"These features doesn't exists: {string.Join(",", notExistingFeatures)}");

      foreach (var feat in groupInput.Features)
      {
        newGroup.SetFeature(feat.Feature, feat.CanRead, feat.CanCreate, feat.CanUpdate, feat.CanDelete);
      }
    }

    AddDefaultFeatures(groupInput, newGroup);

    await repository.AddAsync(newGroup, cancellationToken);
    return newGroup;
  }

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Update)]
  public async Task<Result<Group>> UpdateGroup(
    int groupId,
    AdminGroupInput groupInput,
    [Service] IRepository<Group> repository,
    CancellationToken cancellationToken = default)
  {
    var existingGroup = await repository.GetByIdAsync(groupId, cancellationToken);

    if (existingGroup == null)
    {
      return Result<Group>.Error();
    }

    if (groupInput.Features is not null && groupInput.Features.Any())
    {
      var systemFeatures = Features.AllFeatureList();
      var notExistingFeatures = groupInput.Features.Select(e => e.Feature).Except(systemFeatures);
      if (notExistingFeatures.Any()) throw new ArgumentException($"These features doesn't exists: {string.Join(",", notExistingFeatures)}");

      var permissionsToAdd = groupInput.Features.Select(e => e.Feature).Except(existingGroup.Features.Select(e => e.Feature));
      var permissionsToUpdate = existingGroup.Features.Where(e => groupInput.Features.Select(f => f.Feature).Contains(e.Feature)).Select(e => e.Feature);

      var permissionsToSet = permissionsToAdd.Union(permissionsToUpdate).ToList();

      foreach (var permissionToSet in permissionsToSet)
      {
        var permission = groupInput.Features.Where(e => e.Feature.Equals(permissionToSet)).FirstOrDefault();
        if (permission is null) continue;

        existingGroup.SetFeature(permission.Feature, permission.CanRead, permission.CanCreate, permission.CanUpdate, permission.CanDelete);
      }

      var permissionsToRemove = existingGroup.Features.Select(e => e.Feature).Except(groupInput.Features.Select(e => e.Feature)).ToArray();
      existingGroup.RemoveFeatures(permissionsToRemove);
    }

    AddDefaultFeatures(groupInput, existingGroup);

    existingGroup.SetGroupName(groupInput.Name);
    existingGroup.SetGroupDescription(groupInput.Description);

    await repository.UpdateAsync(existingGroup, cancellationToken);
    return existingGroup;
  }

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Update)]
  public async Task<bool> AddUserToGroup(
    int groupId,
    int userId,
    [Service] IRepository<Group> groupRepository,
    [Service] IRepository<UAgg.User> userRepository,
    [Service] IHttpContextAccessor ctxAccessor,
    [Service] ILogger<AdminMutations> logger,
    CancellationToken cancellationToken = default)
  {
    var group = await groupRepository.GetByIdAsync(groupId, cancellationToken);
    var user = await userRepository.GetByIdAsync(userId, cancellationToken);

    if (group == null || user == null)
    {
      logger.LogInformation("No such group {groupId} or user {userId} while adding user to group from {remoteAddress}",
        groupId,
        userId,
        ctxAccessor?.HttpContext?.Connection.RemoteIpAddress
        );
      return false;
    }

    user.AddGroup(group);

    await userRepository.UpdateAsync(user, cancellationToken);

    return true;
  }

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Update)]
  public async Task<bool> RemoveUserFromGroup(
    int groupId,
    int userId,
    [Service] IRepository<Group> groupRepository,
    [Service] IRepository<UAgg.User> userRepository,
    [Service] IHttpContextAccessor ctxAccessor,
    [Service] ILogger<AdminMutations> logger,
    CancellationToken cancellationToken = default)
  {
    var group = await groupRepository.GetByIdAsync(groupId, cancellationToken);
    var user = await userRepository.GetByIdAsync(userId, cancellationToken);

    if (group == null || user == null)
    {
      logger.LogInformation("No such group {groupId} or user {userId} while removing user from group from {remoteAddress}",
        groupId,
        userId,
        ctxAccessor?.HttpContext?.Connection.RemoteIpAddress
        );
      return false;
    }

    user.RemoveGroup(group);

    await userRepository.UpdateAsync(user, cancellationToken);

    return true;
  }

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Update)]
  public async Task<bool> SetPasswordToUser(
    int userId,
    string newPassword,
    [Service] IRepository<UAgg.User> userRepository,
    [Service] IHttpContextAccessor ctxAccessor,
    [Service] ILogger<AdminMutations> logger,
    CancellationToken cancellationToken = default)
  {
    var user = await userRepository.GetByIdAsync(userId, cancellationToken);

    if (user == null)
    {
      logger.LogInformation("No such user {userId} while resetting password from {remoteAddress}",
        userId,
        ctxAccessor?.HttpContext?.Connection.RemoteIpAddress
        );
      return false;
    }

    user.SetPassword(_passwordHasher.HashPassword(new object(), newPassword));

    await userRepository.UpdateAsync(user, cancellationToken);

    return true;
  }

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Update)]
  public async Task<Result> RevokeSession(
    int userId,
    int sessionId,
    [Service] IRepository<UAgg.User> repository,
    CancellationToken cancellationToken = default)
  {
    var user = await repository
      .AsQueryable(new GetByIdSpec<UAgg.User>(userId), new UserIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (user is null)
    {
      return Result.NotFound();
    }

    var session = user.Sessions.SingleOrDefault(session => session.Id == sessionId);
    if (session is null)
    {
      return Result.NotFound();
    }

    user.RevokeSession(session);
    await repository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Update)]
  public async Task<Result> RevokeAllSessions(
    int userId,
    [Service] IRepository<UAgg.User> repository,
    CancellationToken cancellationToken = default)
  {
    var user = await repository
      .AsQueryable(new GetByIdSpec<UAgg.User>(userId), new UserIncludeAllSpec())
      .SingleOrDefaultAsync(cancellationToken);

    if (user is null)
    {
      return Result.NotFound();
    }

    user.RevokeAllSessions();
    await repository.SaveChangesAsync(cancellationToken);

    return Result.Success();
  }

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Update)]
  public async Task<bool> SetGroupFeature(
    int groupId,
    AdminGroupFeatureInput feature,
    [Service] IRepository<Group> repository,
    [Service] IHttpContextAccessor ctxAccessor,
    [Service] ILogger<AdminMutations> logger,
    CancellationToken cancellationToken = default)
  {
    var oldGroup = await repository.GetByIdAsync(groupId, cancellationToken);

    if (oldGroup == null)
    {
      logger.LogInformation("No such group {groupId} while setting feature from {remoteAddress}",
        groupId,
        ctxAccessor?.HttpContext?.Connection.RemoteIpAddress
        );
      return false;
    }

    oldGroup.SetFeature(feature.Feature,
        feature.CanRead,
        feature.CanCreate,
        feature.CanUpdate,
        feature.CanDelete);

    await repository.UpdateAsync(oldGroup, cancellationToken);

    return true;
  }

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Delete)]
  public Task<Result> DeleteGroupsByIds(
    int[] groupsIds,
    [Service] IRepository<Group> repository,
    CancellationToken cancellationToken = default)
    => DeleteRangeAsync(new GetByIdsSpec<Group>(groupsIds), repository, cancellationToken);

  [BackOfficePermission(Features.ADMIN_USERS_AND_GROUPS, Permission.Delete)]
  public Task<Result> DeleteGroup(
    int groupId,
    [Service] IRepository<Group> repository,
    CancellationToken cancellationToken = default)
    => DeleteAsync(new GetByIdSpec<Group>(groupId), repository, cancellationToken);

  [BackOfficePermission(Features.ADMIN_CONFIG, Permission.Update)]
  public async Task<Result<Config>> UpdateConfig(
    ConfigFunction function,
    string name,
    string? value,
    [Service] IRepository<Config> repository,
    [Service] IServiceProvider serviceProvider)
  {
    var configurableModules = serviceProvider.GetServices<IConfigurableModule>();
    if (!configurableModules.Any(module => module.Function == function && module.ConfigurationParameters.Contains(name)))
    {
      return Result<Config>.NotFound();
    }

    var config = await repository.SingleOrDefaultAsync(new ConfigByFunctionNameSpec(function, name));
    if (config is not null)
    {
      config.SetValue(value);
      await repository.UpdateAsync(config);

      return config;
    }
    
    config = new Config();
    config.SetReferenceData(name, function);
    config.SetValue(value);
    await repository.AddAsync(config);

    return config;
  }

  private static void AddDefaultFeatures(AdminGroupInput groupInput, Group group)
  {
    // Manually added ANAG_SUBJECT_CATEGORY, COMMON_CITIES, DOCUMENTS_BASE, ADMIN_SETTINGS, ADMIN_AUDIT_LOG features because they are not managed on frontend side
    if (groupInput.Features is null || (groupInput.Features is not null && !groupInput.Features.Select(e => e.Feature).Contains(Features.ANAG_SUBJECT_CATEGORY)))
      group.SetFeature(Features.ANAG_SUBJECT_CATEGORY, true, true, true, true);

    if (groupInput.Features is null || (groupInput.Features is not null && !groupInput.Features.Select(e => e.Feature).Contains(Features.COMMON_CITIES)))
      group.SetFeature(Features.COMMON_CITIES, true, true, true, true);

    if (groupInput.Features is null || (groupInput.Features is not null && !groupInput.Features.Select(e => e.Feature).Contains(Features.DOCUMENTS_BASE)))
      group.SetFeature(Features.DOCUMENTS_BASE, true, true, true, true);

    if (groupInput.Features is null || (groupInput.Features is not null && !groupInput.Features.Select(e => e.Feature).Contains(Features.ADMIN_SETTINGS)))
      group.SetFeature(Features.ADMIN_SETTINGS, true, true, true, true);

    if (groupInput.Features is null || (groupInput.Features is not null && !groupInput.Features.Select(e => e.Feature).Contains(Features.ADMIN_AUDIT_LOG)))
      group.SetFeature(Features.ADMIN_AUDIT_LOG, true, true, true, true);
  }
}
