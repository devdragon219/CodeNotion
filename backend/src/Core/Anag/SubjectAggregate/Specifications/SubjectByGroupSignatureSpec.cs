using Ardalis.Specification;

namespace RealGimm.Core.Anag.SubjectAggregate.Specifications;

public class SubjectByGroupSignatureSpec : Specification<Subject>, ISingleResultSpecification<Subject>
{
  public SubjectByGroupSignatureSpec(string signature, int parentGroupId)
  {
    Query
      .Where(subject =>
        subject.Id == parentGroupId ||
        subject.RelationSubordinates.Any(relation =>
          relation.RelationType == SubjectRelationType.CompanyGroup &&
          relation.MainId == parentGroupId))
      .Where(subject =>
        ((ManagementSubject)subject).InterGroupSignature == signature ||
        ((LegalSubject)subject).InterGroupSignature == signature);
  }
}
