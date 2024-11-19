using RealGimm.Core.Anag.SubjectAggregate;

namespace RealGimm.WebFrontOffice.Anag.Extensions;

[ExtendObjectType(typeof(SubjectRelation))]
public class SubjectRelationExtension
{
  public ISubject GetMain([Parent] SubjectRelation subjectRelation) => subjectRelation.Main;
  public ISubject GetSubordinate([Parent] SubjectRelation subjectRelation) => subjectRelation.Subordinate;
}
