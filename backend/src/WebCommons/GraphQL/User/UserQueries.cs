namespace RealGimm.WebCommons.GraphQL.User;

[ExtendObjectType(typeof(Query))]
public class UserQueries
{
  public Queries.UserQueries User { get; } = new Queries.UserQueries();
}