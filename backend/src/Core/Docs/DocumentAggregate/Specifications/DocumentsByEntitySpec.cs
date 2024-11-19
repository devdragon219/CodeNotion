using Ardalis.Specification;

namespace RealGimm.Core.Docs.DocumentAggregate.Specifications;

public class DocumentsByEntitySpec<T> : Specification<Document>, ISingleResultSpecification<Document>
{
  public DocumentsByEntitySpec()
  {
    string entityIdStr = Document.MakeOwner<T>();
    
    Query
        .Where(e => e.EntityId!.StartsWith(entityIdStr));
  }
}
