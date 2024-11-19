using Ardalis.Specification;

namespace RealGimm.Core.Docs.DocumentAggregate.Specifications;

public class DocumentsByEntityIdAndNameSpec<T> : Specification<Document>
{
  public DocumentsByEntityIdAndNameSpec(int entityId, string name)
  {
    string entityIdString = Document.MakeOwnerId<T>(entityId);

    Query
        .Where(s => s.EntityId == entityIdString && s.Name == name);
  }
}
