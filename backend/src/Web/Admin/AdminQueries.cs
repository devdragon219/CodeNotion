namespace RealGimm.Web.Admin;

[ExtendObjectType(typeof(Query))]
public class AdminQueries
{
  public Queries.AdminQueries Admin { get; } = new Queries.AdminQueries();
}