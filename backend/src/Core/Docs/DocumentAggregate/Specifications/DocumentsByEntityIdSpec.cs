using Ardalis.Specification;

namespace RealGimm.Core.Docs.DocumentAggregate.Specifications;

public class DocumentsByEntityIdSpec<T> : Specification<Document>
{
  public DocumentsByEntityIdSpec(int entityId)
  {
    string entityIdString = Document.MakeOwnerId<T>(entityId);

    Query
        .Where(s => s.EntityId == entityIdString);
  }
}
