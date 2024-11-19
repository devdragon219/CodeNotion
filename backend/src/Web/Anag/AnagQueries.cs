namespace RealGimm.Web.Anag;

[ExtendObjectType(typeof(Query))]
public class AnagQueries
{
  public Queries.SubjectQueries Subject { get; } = new Queries.SubjectQueries();
  public Queries.SubjectCategoryQueries SubjectCategory { get; } = new Queries.SubjectCategoryQueries();
  public Queries.OrgUnitQueries OrgUnit { get; } = new Queries.OrgUnitQueries();
}
