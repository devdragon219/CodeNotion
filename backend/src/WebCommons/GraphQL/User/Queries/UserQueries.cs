using Microsoft.EntityFrameworkCore;
using RealGimm.Core;
using RealGimm.Core.IAM.UserAggregate;
using RealGimm.Core.IAM.UserAggregate.Specifications;
using RealGimm.Core.Shared.Specifications;
using RealGimm.SharedKernel.Interfaces;

namespace RealGimm.WebCommons.GraphQL.User.Queries;

public class UserQueries
{
  public Task<Core.IAM.UserAggregate.User?> GetMe(
    [Service] IUserDataProvider userDataProvider,
    [Service] IRepository<Core.IAM.UserAggregate.User> repository)
    => repository
        .AsQueryable(
          new UserByUsernameSpec(userDataProvider.Username),
          new EntityNonDeletedSpec<Core.IAM.UserAggregate.User>(),
          new UserIncludeAllSpec())
        .SingleOrDefaultAsync();

  public IQueryable<Session> GetSessions(
    [Service] IUserDataProvider userDataProvider,
    [Service] IRepository<Core.IAM.UserAggregate.User> repository)
    => repository
        .AsQueryable(new UserByUsernameSpec(userDataProvider.Username), new EntityNonDeletedSpec<Core.IAM.UserAggregate.User>())
        .SelectMany(user => user.Sessions);
}
