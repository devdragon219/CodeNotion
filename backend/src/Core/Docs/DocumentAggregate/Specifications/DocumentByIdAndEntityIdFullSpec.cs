using Ardalis.Specification;

namespace RealGimm.Core.Docs.DocumentAggregate.Specifications;

public class DocumentByIdAndEntityIdFullSpec : Specification<Document>, ISingleResultSpecification<Document>
{
  public DocumentByIdAndEntityIdFullSpec(string entityId, string documentId)
  {
    Query
        .Where(s => s.EntityId == entityId && s.CmisId == documentId);
  }
}
