namespace RealGimm.WebFrontOffice.Anag;

[ExtendObjectType(typeof(Query))]
public class AnagQueries
{
  public Queries.SubjectQueries Subject { get; } = new Queries.SubjectQueries();
  public Queries.SubjectCategoryQueries SubjectCategory { get; } = new Queries.SubjectCategoryQueries();
}
