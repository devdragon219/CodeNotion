using Microsoft.Extensions.Logging;
using RealGimm.Core.Anag.SubjectAggregate.Events;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.GroupAggregate;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Attributes;
using RealGimm.Core.IAM.GroupAggregate.Specifications;
using Microsoft.EntityFrameworkCore;
using RealGimm.Core.IAM.UserAggregate.Specifications;
using RealGimm.Core.EventSystem;
using Rebus.Bus;

namespace RealGimm.Core.Anag.SubjectAggregate.Handlers;

[BackgroundEventHandler]
public class SubjectCreatedHandler : TenantMessageHandler<SubjectCreatedEvent>
{
  public required IRepository<User> Users { protected get; init; }
  public required IRepository<Group> Groups { protected get; init; }
  public required IReadRepository<Subject> Subjects { protected get; init; }
  public required ILogger<SubjectCreatedHandler> Logger { protected get; init; }
  public required IBus Bus { protected get; init; }
  private static readonly SemaphoreSlim _updateLock = new(1, 1);

  protected override async Task HandlePerTenant(SubjectCreatedEvent message)
  {
    var newSubject = await Subjects.GetByIdAsync(message.SubjectId);

    if (newSubject is not null
      && newSubject.PersonType == PersonType.ManagementSubject)
    {
      //Add this subject to the visibility of all administrators and the creating user
      var adminGroups = await Groups.AsQueryable(new UserAdminGroupSpec())
        .Select(g => g.Id)
        .ToArrayAsync();
      var admins = await Users.AsQueryable(
        new EntityNonDeletedSpec<User>(),
        new UserIncludeAllSpec(),
        new UserBelongsToAnyGroupsSpec(adminGroups))
        .ToListAsync();

      var creator = await Users.AsQueryable(new EntityNonDeletedSpec<User>(),
        new UserIncludeAllSpec(),
        new UserByUsernameSpec(message.CreatedByUserName))
        .ToListAsync();

      //If the user is an admin, avoid setting the subject twice
      var usersToUpdate = admins.Concat(creator)
        .GroupBy(u => u.UserName)
        .Select(grp => grp.First());

      var newArray = new[] { message.SubjectId };

      await _updateLock.WaitAsync();
      try
      {
        //Since the update is mapped as SELECT WHERE + UPDATE SET, we need manual
        // synchronization to avoid race conditions
        foreach (var user in usersToUpdate)
        {
          await Users.ExecuteUpdateAsync(
            u => u.Id == user.Id,
            user => user.SetProperty(u => u.Subjects, u => (u.Subjects ?? Array.Empty<int>()).Concat(newArray))
          );
        }
      }
      finally
      {
        _updateLock.Release();
      }

      Logger.LogInformation("Subject {subjectId} added to {userCount} users",
        message.SubjectId,
        usersToUpdate.Count());

      await Bus.Publish(new SubjectVisibilityUpdatedEvent());
    }
  }
}
