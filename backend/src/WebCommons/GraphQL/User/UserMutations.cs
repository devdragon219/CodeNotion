using HotChocolate.Authorization;

namespace RealGimm.WebCommons.GraphQL.User;

[ExtendObjectType(typeof(Mutation))]
public class UserMutations
{
  [AllowAnonymous]
  public Mutations.UserLoginMutations Login { get; } = new();

  public Mutations.UserMutations User { get; } = new();
}
