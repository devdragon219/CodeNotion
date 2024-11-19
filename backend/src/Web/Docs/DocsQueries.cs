namespace RealGimm.Web.Docs;

[ExtendObjectType(typeof(Query))]
public class DocsQueries
{
  public Queries.DocumentQueries Document { get; } = new Queries.DocumentQueries();
}
