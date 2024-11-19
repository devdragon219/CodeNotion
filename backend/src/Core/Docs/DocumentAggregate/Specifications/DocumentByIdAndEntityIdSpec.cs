using Ardalis.Specification;

namespace RealGimm.Core.Docs.DocumentAggregate.Specifications;

public class DocumentByIdAndEntityIdSpec<T> : Specification<Document>, ISingleResultSpecification<Document>
{
  public DocumentByIdAndEntityIdSpec(int entityId, string documentId)
  {
    string entityIdStr = Document.MakeOwnerId<T>(entityId);

    Query
        .Where(s => s.EntityId == entityIdStr && s.CmisId == documentId);
  }
}
